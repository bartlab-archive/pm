import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromProjects from './projects.reducer';
import * as fromMembers from './members.reducer';

export interface ProjectsState {
    projects: fromProjects.State;
    members: fromMembers.State;
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
    members: fromMembers.reducer,
};

export const selectModuleState = createFeatureSelector<State, ProjectsState>('moduleProjects');
export const selectProjectsState = createSelector(selectModuleState, (state: ProjectsState) => state.projects);
export const selectProjectsEntities = createSelector(selectProjectsState, state => state.entities);
export const selectProjectsMy = createSelector(selectProjectsState, state => state.my);

export const selectMembersState = createSelector(selectModuleState, (state: ProjectsState) => state.members);
export const selectMembersEntities = createSelector(selectMembersState, state => state.entities);