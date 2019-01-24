import {createSelector} from '@ngrx/store';
import {selectProjectsState, selectProjectsEntities} from '../reducers';

export const selectProjectsMeta = createSelector(selectProjectsState, state => state.meta);
export const selectProjectsIds = createSelector(selectProjectsState, state => state.ids);
export const selectProjectsActiveId = createSelector(selectProjectsState, state => state.activeId);
export const selectProjects = createSelector(selectProjectsEntities, selectProjectsIds, (entities, ids) =>
    ids.map((id) => entities[id]),
);

export const selectProjectsActive = createSelector(
    selectProjectsEntities,
    selectProjectsActiveId,
    (entities, activeId) => entities[activeId],
);

export const selectProjectsStatus = createSelector(selectProjectsState, state => state.status);
export const selectProjectsError = createSelector(selectProjectsState, state => state.error);
