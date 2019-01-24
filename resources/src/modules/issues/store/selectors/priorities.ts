import {createSelector} from '@ngrx/store';
import {selectPrioritiesState, selectPrioritiesEntities} from '../reducers';

export const selectPrioritiesIds = createSelector(selectPrioritiesState, state => state.ids);
export const selectPriorities = createSelector(selectPrioritiesEntities, selectPrioritiesIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});