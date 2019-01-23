import {createSelector} from '@ngrx/store';
import {selectStatusesState} from '../reducers';

export const selectStatusesEntities = createSelector(selectStatusesState, state => state.entities);
export const selectStatusesIds = createSelector(selectStatusesState, state => state.ids);
export const selectStatuses = createSelector(selectStatusesEntities, selectStatusesIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});