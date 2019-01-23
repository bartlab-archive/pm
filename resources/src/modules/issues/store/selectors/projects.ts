import {createSelector} from '@ngrx/store';
import {selectProjectsState} from '../reducers';

export const selectProjectsEntities = createSelector(selectProjectsState, (state: any) => state.entities);
export const selectProjectsMy = createSelector(selectProjectsState, (state: any) => state.my);
export const selectProjects = createSelector(selectProjectsEntities, selectProjectsMy, (entities, ids) => {
    return ids.map(id => entities[id]);
});