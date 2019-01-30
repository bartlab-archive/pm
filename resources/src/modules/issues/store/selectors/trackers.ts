import {createSelector} from '@ngrx/store';
import {selectTrackersState, selectTrackersEntities} from '../reducers';
import {trackersSchema} from '../schemas'
import {denormalize} from 'normalizr';

export const selectTrackersIds = createSelector(selectTrackersState, state => state.ids);
export const selectTrackers = createSelector([selectTrackersIds, selectTrackersEntities],
    (ids, entities) => denormalize(ids, [trackersSchema], {trackers: entities}));
