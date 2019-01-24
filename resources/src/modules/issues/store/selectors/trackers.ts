import {createSelector} from '@ngrx/store';
import {selectTrackersState, selectTrackersEntities} from '../reducers';


export const selectTrackersIds = createSelector(selectTrackersState, state => state.ids);
export const selectTrackers = createSelector(selectTrackersEntities, selectTrackersIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});

