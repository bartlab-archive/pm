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
export const selectProjectsMeta = createSelector(selectProjectsState, fromProjects.getMeta);
export const selectProjectsIds = createSelector(selectProjectsState, fromProjects.getIds);
export const selectProjectsActiveId = createSelector(selectProjectsState, fromProjects.getActiveId);
export const selectProjects = createSelector(
    selectProjectsData,
    selectProjectsIds,
    (data, ids) => data.filter(project => ids.indexOf(project.identifier) !== -1),
);

export const selectProjectsActive = createSelector(
    selectProjectsData,
    selectProjectsActiveId,
    (data, activeId) => data.find(project => project.identifier === activeId),
);

export const selectProjectsStatus = createSelector(selectProjectsState, fromProjects.getStatus);
export const selectProjectsError = createSelector(selectProjectsState, fromProjects.getError);

