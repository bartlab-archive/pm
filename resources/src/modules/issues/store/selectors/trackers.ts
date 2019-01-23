import {createSelector} from '@ngrx/store';
import {selectTrackersState} from '../reducers';

export const selectTrackersEntities = createSelector(selectTrackersState, state => state.entities);
export const selectTrackersIds = createSelector(selectTrackersState, state => state.ids);
export const selectTrackers = createSelector(selectTrackersEntities, selectTrackersIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

