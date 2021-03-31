import { expectSaga } from 'redux-saga-test-plan';
import { reducer as formReducer } from 'redux-form';
import { Action } from 'redux';
import * as matchers from 'redux-saga-test-plan/matchers';
import { combineReducers } from 'redux';
import { createFailedResponse, createSuccessfulResponse } from '../../../__mocks__/response';
import repoReducer, { initialState } from '../reducer';
import axios from '../../axios';
import repoSaga from '../saga';
import formMock from '../../../__mocks__/form';
import { repoActions } from '../actions';
import { repoIssuesMock } from '../../../__mocks__/repo';
import { IApplicationState } from '../../appReducer';
import { throwError } from 'redux-saga-test-plan/providers';

export const setupTest = (storeInitialState: IApplicationState) =>
  expectSaga(repoSaga).withReducer<IApplicationState, Action<any>>(
    combineReducers({
      form: formReducer,
      repo: repoReducer,
    }),
    storeInitialState,
  );

describe('repoSaga', () => {
  const page = 1;
  describe('get github issues', () => {
    const storeInitialState: IApplicationState = {
      form: formMock,
      repo: initialState,
    };
    it('should fetch github issues from api successfully', async () => {
      const response = createSuccessfulResponse(repoIssuesMock);
      const { storeState } = await setupTest(storeInitialState)
        .provide([[matchers.call.fn(axios.get), response]])
        .dispatch(repoActions.getRepoIssues({ page }))
        .put(
          repoActions.getRepoIssuesSuccess({
            issues: response.data,
            page,
            hasMoreIssues: true,
          }),
        )
        .silentRun();
      expect(storeState.repo).toEqual({
        ...storeState.repo,
        issues: {
          ...storeState.repo.issues,
          [page]: response.data,
        },
        page,
        error: false,
        isLoading: false,
        hasMoreIssues: true,
      });
    });
    it('should set current page if it is fetched before', async () => {
      const { storeState } = await setupTest({
        ...storeInitialState,
        repo: {
          ...storeInitialState.repo,
          issues: { [page]: repoIssuesMock.data },
        },
      })
        .dispatch(repoActions.getRepoIssues({ page }))
        .put(
          repoActions.setCurrentPage({
            page,
            hasMoreIssues: false,
          }),
        )
        .silentRun();
      expect(storeState.repo).toEqual({
        ...storeState.repo,
        page,
        error: false,
        isLoading: false,
        hasMoreIssues: false,
      });
    });
    it('should throw an error when organization and/or repository not found ', async () => {
      const response = createFailedResponse(404);
      const { storeState } = await setupTest(storeInitialState)
        .provide([[matchers.call.fn(axios.get), throwError({ response } as any)]])
        .dispatch(repoActions.getRepoIssuesFailed())
        .silentRun();

      expect(storeState.repo).toEqual(storeInitialState.repo);
    });
    it('should throw an error when api fails with 500 ', async () => {
      const response = createFailedResponse(500);
      const { storeState } = await setupTest(storeInitialState)
        .provide([[matchers.call.fn(axios.get), throwError({ response } as any)]])
        .dispatch(repoActions.getRepoIssuesFailed())
        .silentRun();

      expect(storeState.repo).toEqual(storeInitialState.repo);
    });
  });
});
