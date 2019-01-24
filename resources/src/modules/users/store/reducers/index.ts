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

