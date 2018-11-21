import {
    // ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
// import {localStorageSync} from 'ngrx-store-localstorage';
import {issuesReducers} from './issues.reducer';
import {statusesReducers} from './statuses.reducer';
import {trackersReducers} from './trackers.reducer';

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync({keys: [{issues: ['entities', 'meta']}], rehydrate: true})(reducer);
// }

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    list: issuesReducers,
    statuses: statusesReducers,
    trackers: trackersReducers
};

// module
export const selectModuleSate = createFeatureSelector('issues');
export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.list);
export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);

// issues
export const selectIssuesEntities = createSelector(selectIssuesState, (state) => state.entities);
export const selectIssuesStatus = createSelector(selectIssuesState, (state) => state.status);
export const selectIssuesError = createSelector(selectIssuesState, (state) => state.error);
export const selectIssuesMeta = createSelector(selectIssuesState, (state) => state.meta);

// statuses
export const selectStatusesEntities = createSelector(selectStatusesState, (state) => state.entities);
export const selectStatusesStatus = createSelector(selectStatusesState, (state) => state.status);
export const selectStatusesError = createSelector(selectStatusesState, (state) => state.error);

// trackers
export const selectTrackersEntities = createSelector(selectTrackersState, (state) => state.entities);
export const selectTrackersStatus = createSelector(selectTrackersState, (state) => state.status);
export const selectTrackersError = createSelector(selectTrackersState, (state) => state.error);
