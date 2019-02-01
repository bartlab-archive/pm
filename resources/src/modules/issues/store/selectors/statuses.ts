import {createSelector} from '@ngrx/store';
import {selectStatusesState, selectStatusesEntities} from '../reducers';
import {denormalize} from 'normalizr';
import {statusesSchema} from '../schemas';

export const selectStatusesActiveId = createSelector(selectStatusesState, state => state.activeId);
export const selectStatusesIds = createSelector(selectStatusesState, state => state.ids);
export const selectStatuses = createSelector(
    [selectStatusesIds, selectStatusesEntities],
    (ids, entities) => denormalize(ids, [statusesSchema], {statuses: entities})
);
export const selectStatusesStatus = createSelector(selectStatusesState, state => state.status);
export const selectStatusesActive = createSelector(
    [selectStatusesActiveId, selectStatusesEntities],
    (activeId, entities) => denormalize(activeId, statusesSchema, {statuses: entities})
);
