import {createSelector} from '@ngrx/store';
import {selectPrioritiesState, selectPrioritiesEntities} from '../reducers';
import {denormalize} from 'normalizr';
import {prioritiesSchema} from '../schemas';

export const selectPrioritiesIds = createSelector(selectPrioritiesState, (state: any) => state.ids);
export const selectPriorities = createSelector(
    [selectPrioritiesIds, selectPrioritiesEntities],
    (ids, entities) => denormalize(ids, [prioritiesSchema], {priorities: entities}),
);
