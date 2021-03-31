import { combineReducers, Reducer } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';

import repo, { IRepoState } from './repo/reducer';

export interface IApplicationState {
  repo: IRepoState;
  form: FormStateMap;
}

const appReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  form,
  repo,
});

export default appReducer;
