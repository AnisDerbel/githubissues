import { call, put, takeLatest, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ERepoActionTypes, repoActions, TRepoIssuesAction } from './actions';
import axios from '../axios';
import { IApplicationState } from '../appReducer';

const PAGE_SIZE = 30;

function* getRepoIssues({ payload }: TRepoIssuesAction) {
  try {
    const { page } = payload;
    const {
      form: { values },
    } = yield select((state: IApplicationState) => state.form);
    const { issues, hasMoreIssues } = yield select((state: IApplicationState) => state.repo);

    if (!!issues[page]) {
      yield put(
        repoActions.setCurrentPage({
          page,
          hasMoreIssues: hasMoreIssues || issues[page + 1] ? true : false,
        }),
      );
      return;
    }
    const repoIssues: AxiosResponse = yield call(
      axios.get,
      `/repos/${values.organization}/${values.repository}/issues?direction=desc&sort=created&state=all&page=${page}&per_page=${PAGE_SIZE}`,
    );
    const length = repoIssues.data.length;
    yield put(
      repoActions.getRepoIssuesSuccess({
        issues: repoIssues.data,
        page,
        hasMoreIssues: length === 0 || length < PAGE_SIZE ? false : true,
      }),
    );
  } catch (e) {
    yield put(repoActions.getRepoIssuesFailed());
  }
}

function* repoSaga() {
  yield takeLatest(ERepoActionTypes.GET_REPO_ISSUES, getRepoIssues);
}

export default repoSaga;
