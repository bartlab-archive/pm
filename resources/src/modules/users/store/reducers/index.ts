import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromUsers from './users.reducer';

export interface UsersState {
    users: fromUsers.State;
}

export interface State extends fromRoot.State {
    'module.users': UsersState;
}

export const reducers: ActionReducerMap<UsersState> = {
    users: fromUsers.reducer
};

// module
export const selectModuleState = createFeatureSelector('module.users');
export const selectUsersState = createSelector(selectModuleState, (state: any) => state.users);
export const selectUsersEntities = createSelector(selectUsersState, (state: any) => state.entities);
export const selectUsersIds = createSelector(selectUsersState, state => state.ids);

