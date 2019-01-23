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
import {prioritiesReducers} from './priorities.reducer';
import {membersReducers} from './members.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: issuesReducers,
    projects: projectReducers,
    statuses: statusesReducers,
    trackers: trackersReducers,
    priorities: prioritiesReducers,
    users: userReducers,
    members: membersReducers,
};

// module
export const selectModuleSate = createFeatureSelector('module.issues');
export const selectIssuesState = createSelector(selectModuleSate, (state: any) => state.issues);
export const selectIssuesEntities = createSelector(selectIssuesState, (state: any) => state.entities);

export const selectUsersState = createSelector(selectModuleSate, (state: any) => state.users);
export const selectUsersEntities = createSelector(selectUsersState, state => state.entities);

export const selectTrackersState = createSelector(selectModuleSate, (state: any) => state.trackers);
export const selectTrackersEntities = createSelector(selectTrackersState, state => state.entities);

export const selectStatusesState = createSelector(selectModuleSate, (state: any) => state.statuses);
export const selectStatusesEntities = createSelector(selectStatusesState, state => state.entities);

export const selectProjectsState = createSelector(selectModuleSate, (state: any) => state.projects);
export const selectProjectsEntities = createSelector(selectProjectsState, (state: any) => state.entities);

export const selectPrioritiesState = createSelector(selectModuleSate, (state: any) => state.priorities);
export const selectPrioritiesEntities = createSelector(selectPrioritiesState, state => state.entities);

export const selectMembersState = createSelector(selectModuleSate, (state: any) => state.members);
export const selectMembersEntities = createSelector(selectMembersState, state => state.entities);