import {denormalize} from 'normalizr';
import {createSelector} from '@ngrx/store';
import {selectUsersState, selectUsersEntities} from '../reducers';
import {usersSchema} from '../schemas';

export const selectUsersIds = createSelector(selectUsersState, state => state.ids);
export const selectUsers = createSelector(
    [selectUsersIds, selectUsersEntities],
    (ids, entities) => denormalize(ids, [usersSchema], {users: entities})
);
