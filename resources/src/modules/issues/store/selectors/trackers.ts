import {createSelector} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {trackersSchema} from '../schemas';
import {selectModuleState} from './index';

export const selectTrackersState = createSelector(selectModuleState, (state: any) => state.trackers);
export const selectTrackersEntities = createSelector(selectTrackersState, (state: any) => state.entities);

export const selectTrackersIds = createSelector(selectTrackersState, (state: any) => state.ids);
export const selectTrackers = createSelector(
    [selectTrackersIds, selectTrackersEntities],
    (ids, entities) => denormalize(ids, [trackersSchema], {trackers: entities}),
);
