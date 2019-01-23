import {createSelector} from '@ngrx/store';
import {selectProjectsState, selectProjectsEntities} from '../reducers';

export const selectProjectsMy = createSelector(selectProjectsState, (state: any) => state.my);
export const selectProjects = createSelector(selectProjectsEntities, selectProjectsMy, (entities, ids) => {
    return ids.map(id => entities[id]);
});