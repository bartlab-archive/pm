import {createSelector} from '@ngrx/store';
import {
    selectUsersState,
} from '../reducers';

import {denormalize} from "normalizr";
import {usersSchema} from "../schemas";

const mapEntitiesToObject = (users?) => ({
    users,
});

const selectUsersEntities = createSelector(selectUsersState, state => state.entities);
const selectUserActiveId = createSelector(selectUsersState, state => state.activeId);

const selectEntities = [
    selectUsersEntities,
];

const selectUsersMeta = createSelector(selectUsersState, state => state.meta);
const selectUsersPending = createSelector(selectUsersState, state => state.pending);
const selectUsersIds = createSelector(selectUsersState, state => state.ids);

const selectUsers = createSelector(
    [selectUsersIds, ...selectEntities] as any,
    (ids, ...entities) => denormalize(ids, [usersSchema], mapEntitiesToObject(...entities)),
);

const selectUserActive = createSelector(
    [selectUserActiveId, ...selectEntities] as any,
    (activeId, ...entities) => denormalize(activeId, usersSchema, mapEntitiesToObject(...entities))
);

export {
    selectUsersMeta,
    selectUsersIds,
    selectUsers,
    selectUserActive,
    selectUsersPending
}
