import {createSelector} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {prioritiesSchema} from '../schemas';
import {selectModuleState} from './index';

export const selectPrioritiesState = createSelector(selectModuleState, (state: any) => state.priorities);
export const selectPrioritiesEntities = createSelector(selectPrioritiesState, (state: any) => state.entities);

export const selectPrioritiesIds = createSelector(selectPrioritiesState, (state: any) => state.ids);
export const selectPriorities = createSelector(
    [selectPrioritiesIds, selectPrioritiesEntities],
    (ids, entities) => denormalize(ids, [prioritiesSchema], {priorities: entities}),
);
