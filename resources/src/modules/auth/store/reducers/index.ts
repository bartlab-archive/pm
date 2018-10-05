import * as fromRoot from '../../../../store/reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
    authorization: fromAuth.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    authorization: fromAuth.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
export const selectAuthorizationState = createSelector(selectAuthState, (state: AuthState) => state.authorization);
export const getAuthData = createSelector(selectAuthorizationState, fromAuth.getData);
export const getAuthError = createSelector(selectAuthorizationState, fromAuth.getError);
export const getAuthPending = createSelector(selectAuthorizationState, fromAuth.getPending);
