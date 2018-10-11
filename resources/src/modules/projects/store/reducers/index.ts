import * as fromRoot from '../../../../app/store/reducers';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface ProjectsState {
    projects: fromProjects.State;
}

export interface State extends fromRoot.State {
    'module.projects': ProjectsState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{authorization: ['data']}], rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const reducers: ActionReducerMap<ProjectsState> = {
    projects: fromProjects.reducer,
};

export const selectModuleState = createFeatureSelector<State, ProjectsState>('module.projects');
export const selectProjectsState = createSelector(selectModuleState, (state: ProjectsState) => state.projects);
export const selectProjectsData = createSelector(selectProjectsState, fromProjects.getData);
export const selectProjectsError = createSelector(selectProjectsState, fromProjects.getError);
export const selectProjectsStatus = createSelector(selectProjectsState, fromProjects.getStatus);
