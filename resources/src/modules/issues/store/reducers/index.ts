import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';

import {issuesReducers} from './issues.reducer';
import {trackersReducers} from './trackers.reducer';
import {statusesReducers} from './statuses.reducer';
import {prioritiesReducers} from './priorities.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: issuesReducers,
    statuses: statusesReducers,
    trackers: trackersReducers,
    priorities: prioritiesReducers,
};
// module
// @todo: typo in "selectModuleSate" name
export const selectModuleSate = createFeatureSelector('moduleIssues');

export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.issues);
export const selectIssuesEntities = createSelector(selectIssuesState, (state: any) => state.entities);

export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);
export const selectTrackersEntities = createSelector(selectTrackersState, (state: any) => state.entities);

export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectStatusesEntities = createSelector(selectStatusesState, (state: any) => state.entities);

export const selectPrioritiesState = createSelector(selectModuleSate, (state: any) => state.priorities);
export const selectPrioritiesEntities = createSelector(selectPrioritiesState, (state: any) => state.entities);
