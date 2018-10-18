import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromProjects from './projects.reducer';

export interface ProjectsState {
    projects: fromProjects.State;
}

export interface State extends fromRoot.State {
    'module.projects': ProjectsState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: [{ projects: ['entities'] }], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
export const reducers: ActionReducerMap<ProjectsState> = {
    projects: fromProjects.reducer,
};

export const selectModuleState = createFeatureSelector<State, ProjectsState>('module.projects');
export const selectProjectsState = createSelector(selectModuleState, (state: ProjectsState) => state.projects);
export const selectProjectsEntities = createSelector(selectProjectsState, fromProjects.getEntities);
export const selectProjectsMeta = createSelector(selectProjectsState, fromProjects.getMeta);
export const selectProjectsIds = createSelector(selectProjectsState, fromProjects.getIds);
export const selectProjectsActiveId = createSelector(selectProjectsState, fromProjects.getActiveId);
export const selectProjects = createSelector(selectProjectsEntities, selectProjectsIds, (entities, ids) =>
    ids.map((id) => entities[id]),
);

export const selectProjectsActive = createSelector(
    selectProjectsEntities,
    selectProjectsActiveId,
    (entities, activeId) => entities[activeId],
);

export const selectProjectsStatus = createSelector(selectProjectsState, fromProjects.getStatus);
export const selectProjectsError = createSelector(selectProjectsState, fromProjects.getError);
