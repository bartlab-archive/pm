import {createSelector} from '@ngrx/store';
import {
    selectIssuesState,
} from '../reducers';

export const selectIssuesIds = createSelector(selectIssuesState, state => state.ids);
export const selectIssuesStatus = createSelector(selectIssuesState, state => state.status);
export const selectIssuesError = createSelector(selectIssuesState, state => state.error);
export const selectIssuesActiveId = createSelector(selectIssuesState, state => state.activeId);
export const selectIssuesMeta = createSelector(selectIssuesState, state => state.meta);
