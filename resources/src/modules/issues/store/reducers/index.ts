import {
    // ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
// import {localStorageSync} from 'ngrx-store-localstorage';
import * as fromIssues from './issues.reducer';
import *  as fromUsers from './users.reducer';
import * as fromTrackers from './trackers.reducer';
import * as fromStatuses from './statuses.reducer';

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync({keys: [{issues: ['entities', 'meta']}], rehydrate: true})(reducer);
// }

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: fromIssues.issuesReducers,
    statuses: fromStatuses.reducers,
    trackers: fromTrackers.reducers,
    users: fromUsers.reducers,
};

// module
export const selectModuleSate = createFeatureSelector('module.issues');

export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.issues);
export const selectIssuesEntities = createSelector(selectIssuesState, fromIssues.selectEntities);

export const selectUsersState = createSelector(selectModuleSate, (state: any) => state.users);
export const selectUsersEntities = createSelector(selectUsersState, fromUsers.selectEntities);

export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);
export const selectTrackersEntities = createSelector(selectTrackersState, fromTrackers.selectEntities);

export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectStatusesEntities = createSelector(selectStatusesState, fromStatuses.selectEntities);

// trackers
export const selectTrackersStatus = createSelector(selectTrackersState, (state) => state.status);
export const selectTrackersError = createSelector(selectTrackersState, (state) => state.error);