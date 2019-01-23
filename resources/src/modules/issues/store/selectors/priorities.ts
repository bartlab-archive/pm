import {createSelector} from '@ngrx/store';
import {selectPrioritiesState} from '../reducers';

export const selectPrioritiesEntities = createSelector(selectPrioritiesState, state => state.entities);
export const selectPrioritiesIds = createSelector(selectPrioritiesState, state => state.ids);
export const selectPriorities = createSelector(selectPrioritiesEntities, selectPrioritiesIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});