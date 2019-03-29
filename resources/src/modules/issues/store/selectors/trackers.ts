import {createSelector} from '@ngrx/store';
import {denormalize} from 'normalizr';

import {trackersSchema} from '../schemas';
import {selectModuleState} from './index';

export const selectTrackersState = createSelector(selectModuleState, (state: any) => state.trackers);

export const selectTrackersStatus = createSelector(selectTrackersState, (state: any) => state.status);
export const selectTrackersEntities = createSelector(selectTrackersState, (state: any) => state.entities);
export const selectTrackersIds = createSelector(selectTrackersState, (state: any) => state.ids);
export const selectTrackersActiveId = createSelector(selectTrackersState, (state: any) => state.activeId);
export const selectTrackersRequestId = createSelector(selectTrackersState, (state: any) => state.requestId);

export const selectTrackers = createSelector(
    [selectTrackersIds, selectTrackersEntities],
    (ids, entities) => denormalize(ids, [trackersSchema], {trackers: entities}),
);

export const selectTrackersActive = createSelector(
    [selectTrackersActiveId, selectTrackersEntities],
    (activeId, entities) => denormalize(activeId, trackersSchema, {trackers: entities}),
);