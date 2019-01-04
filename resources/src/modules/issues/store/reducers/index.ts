import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import {issuesReducers} from './issues.reducer';
import {userReducers} from './users.reducer';
import {trackersReducers} from './trackers.reducer';
import {statusesReducers} from './statuses.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: issuesReducers,
    statuses: statusesReducers,
    trackers: trackersReducers,
    users: userReducers,
};

// module
export const selectModuleSate = createFeatureSelector('module.issues');
export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.issues);

export const selectUsersState = createSelector(selectModuleSate, (state: any) => state.users);
export const selectUsersEntities = createSelector(selectUsersState, state => state.entities);

export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);
export const selectTrackersEntities = createSelector(selectTrackersState, state => state.entities);

export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectStatusesEntities = createSelector(selectStatusesState, state => state.entities);
