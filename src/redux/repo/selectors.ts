import { createSelector } from 'reselect';

import { IApplicationState } from '../appReducer';
import { IRepoState, Issue } from './reducer';

export const repo = (state: IApplicationState): IRepoState => state.repo;

export const getCurrentIssues = createSelector(
  [repo],
  ({ page, issues }): Array<Issue> => issues[page],
);
