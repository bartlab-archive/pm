import {denormalize} from 'normalizr';
import {createSelector} from '@ngrx/store';
import {selectUsersState} from '../reducers';
import {usersSchema} from '../schemas';

export const selectUsersEntities = createSelector(selectUsersState, state => state.entities);
export const selectUsersIds = createSelector(selectUsersState, state => state.ids);
export const selectUsers = createSelector(
    [selectUsersIds, selectUsersEntities],
    (ids, entities) => denormalize(ids, [usersSchema], {users: entities})
);
