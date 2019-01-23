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
import {projectReducers} from './projects.reducer';
import {enumerationsReducers} from './enumerations.reducer';
import {membersReducers} from './members.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: issuesReducers,
    projects: projectReducers,
    statuses: statusesReducers,
    trackers: trackersReducers,
    priorities: enumerationsReducers,
    users: userReducers,
    members: membersReducers,
};

// module
export const selectModuleSate = createFeatureSelector('module.issues');
export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.issues);
export const selectUsersState = createSelector(selectModuleSate, (state: any) => state.users);


export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);
export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectProjectsState = createSelector(selectModuleSate, (state: any) => state.projects);
export const selectPrioritiesState = createSelector(selectModuleSate, (state: any) => state.priorities);
export const selectMembersState = createSelector(selectModuleSate, (state: any) => state.members);