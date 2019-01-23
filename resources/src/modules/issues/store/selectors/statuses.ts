import {createSelector} from '@ngrx/store';
import {selectStatusesState, selectStatusesEntities} from '../reducers';


export const selectStatusesIds = createSelector(selectStatusesState, state => state.ids);
export const selectStatuses = createSelector(selectStatusesEntities, selectStatusesIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});