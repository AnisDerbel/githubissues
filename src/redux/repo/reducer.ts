import { AnyAction, Reducer } from 'redux';
import { ERepoActionTypes } from './actions';

export interface PaginatedIssue {
  [key: number]: Array<Issue>;
}
export type IRepoState = {
  issues: PaginatedIssue;
  isLoading: boolean;
  error: string | boolean | null;
  hasMoreIssues: boolean;
  page: number;
};
export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Issue {
  node_id: string;
  title: string;
  labels: Array<Label>;
  user: { login: string };
  number: number;
  created_at: string;
  state: 'open' | 'closed';
  html_url: string;
  comments: number;
}

export const initialState: IRepoState = {
  issues: {},
  isLoading: false,
  hasMoreIssues: false,
  error: null,
  page: 0,
};

const formReducer: Reducer<IRepoState> = (
  state: IRepoState = initialState,
  action: AnyAction,
): IRepoState => {
  switch (action.type) {
    case ERepoActionTypes.GET_REPO_ISSUES: {
      return {
        ...state,
        isLoading: true,
        issues: action.payload.reset === true ? {} : state.issues,
        error: null,
      };
    }
    case ERepoActionTypes.GET_REPO_ISSUES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        hasMoreIssues: action.payload.hasMoreIssues,
        page: action.payload.page,
        issues: {
          ...state.issues,
          [action.payload.page]: action.payload.issues,
        },
      };
    }
    case ERepoActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        isLoading: false,
        error: false,
        hasMoreIssues: action.payload.hasMoreIssues,
        page: action.payload.page,
      };
    }
    case ERepoActionTypes.GET_REPO_ISSUES_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default formReducer;
