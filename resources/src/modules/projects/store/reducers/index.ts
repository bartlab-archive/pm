import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromProjects from './projects.reducer';
// import * as fromUsers from './users.reducer';
// import * as fromMembers from './members.reducer';
// import * as fromRoles from './roles.reducer';

export interface ProjectsState {
    projects: fromProjects.State;
    // users: fromUsers.State;
    // members: fromMembers.State;
    // roles: fromRoles.State;
}

export interface State extends fromRoot.State {
    moduleProjects: ProjectsState;
}

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync({keys: [{projects: ['entities']}], rehydrate: true})(reducer);
// }

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<ProjectsState> = {
    projects: fromProjects.reducer,
    // users: fromUsers.reducer,
    // members: fromMembers.reducer,
    // roles: fromRoles.reducer
};

export const selectModuleState = createFeatureSelector<State, ProjectsState>('moduleProjects');
export const selectProjectsState = createSelector(selectModuleState, (state: ProjectsState) => state.projects);
export const selectProjectsEntities = createSelector(selectProjectsState, state => state.entities);
export const selectProjectsMy = createSelector(selectProjectsState, state => state.my);

// export const selectUsersState = createSelector(selectModuleState, (state: ProjectsState) => state.users);
// export const selectUsersEntities = createSelector(selectUsersState, state => state.entities);

// export const selectMembersState = createSelector(selectModuleState, (state: ProjectsState) => state.members);
// export const selectMembersEntities = createSelector(selectMembersState, state => state.entities);

// export const selectRolesState = createSelector(selectModuleState, (state: ProjectsState) => state.roles);
// export const selectRolesEntities = createSelector(selectRolesState, state => state.entities);
