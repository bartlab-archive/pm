import {createSelector} from '@ngrx/store';
import {
    selectUsersState,
} from '../reducers';

const selectUsersMeta = createSelector(selectUsersState, state => state.meta);
const selectUsersIds = createSelector(selectUsersState, state => state.ids);

export {
    selectUsersMeta,
    selectUsersIds
}
