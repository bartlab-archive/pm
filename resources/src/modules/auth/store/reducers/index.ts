import * as fromRoot from '../../../../app/store/reducers';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AuthState {
    authorization: fromAuth.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{authorization: ['data']}], rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const reducers: ActionReducerMap<AuthState> = {
    authorization: fromAuth.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
export const selectAuthorizationState = createSelector(selectAuthState, (state: AuthState) => state.authorization);
export const selectAuthData = createSelector(selectAuthorizationState, fromAuth.getData);
export const selectAuthError = createSelector(selectAuthorizationState, fromAuth.getError);
export const selectAuthStatus = createSelector(selectAuthorizationState, fromAuth.getStatus);
