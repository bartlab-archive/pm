import {combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUsers from './users.reducer';
import * as fromRoles from './roles.reducer';

export interface State {
    users: fromUsers.State;
    roles: fromRoles.State;
}

export const reducer = combineReducers({
    users: fromUsers.reducer,
    roles: fromRoles.reducer,
});

export const selectModuleState = createFeatureSelector<State>('app');
export const selectUsersState = createSelector(selectModuleState, (state: State) => state.users);
export const selectUsersEntities = createSelector(selectUsersState, (state) => state.entities);

export const selectRolesState = createSelector(selectModuleState, (state: State) => state.roles);
export const selectRolesEntities = createSelector(selectRolesState, (state) => state.entities);
