import {createSelector} from '@ngrx/store';
import {selectStatusesState, selectStatusesEntities} from '../reducers';
import {denormalize} from 'normalizr';
import {statusesSchema} from '../schemas';

export const selectStatusesActiveId = createSelector(selectStatusesState, (state: any) => state.activeId);
export const selectStatusesIds = createSelector(selectStatusesState, (state: any) => state.ids);
export const selectStatuses = createSelector(
    [selectStatusesIds, selectStatusesEntities],
    (ids, entities) => denormalize(ids, [statusesSchema], {statuses: entities}),
);
export const selectStatusesStatus = createSelector(selectStatusesState, (state: any) => state.status);
export const selectStatusesRequestId = createSelector(selectStatusesState, (state: any) => state.requestId);
export const selectStatusesActive = createSelector(
    [selectStatusesActiveId, selectStatusesEntities],
    (activeId, entities) => denormalize(activeId, statusesSchema, {statuses: entities}),
);
