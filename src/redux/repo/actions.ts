import { Issue } from './reducer';
import { Action } from 'redux';

export enum ERepoActionTypes {
  GET_REPO_ISSUES = 'REPO.GET_REPO_ISSUES',
  GET_REPO_ISSUES_SUCCESS = 'REPO.GET_REPO_ISSUES_SUCCESS',
  SET_CURRENT_PAGE = 'REPO.SET_CURRENT_PAGE',
  GET_REPO_ISSUES_FAILED = 'REPO.GET_REPO_ISSUES_FAILED',
}

interface IssuesResponse {
  issues: Array<Issue>;
  hasMoreIssues: boolean;
  page: number;
}
interface LoadPageIssues {
  hasMoreIssues: boolean;
  page: number;
}

interface IRepoIssuesPayload {
  page: number;
  reset?: boolean;
}

export interface IActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export type TRepoIssuesAction = IActionWithPayload<
  ERepoActionTypes.GET_REPO_ISSUES,
  {
    page: number;
    reset?: boolean;
  }
>;

export const repoActions = {
  getRepoIssues: (payload: IRepoIssuesPayload) => ({
    type: ERepoActionTypes.GET_REPO_ISSUES,
    payload,
  }),
  getRepoIssuesSuccess: (payload: IssuesResponse) => ({
    type: ERepoActionTypes.GET_REPO_ISSUES_SUCCESS,
    payload,
  }),
  setCurrentPage: (payload: LoadPageIssues) => ({
    type: ERepoActionTypes.SET_CURRENT_PAGE,
    payload,
  }),
  getRepoIssuesFailed: () => ({
    type: ERepoActionTypes.GET_REPO_ISSUES_FAILED,
  }),
};
