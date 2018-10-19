import * as fromRoot from '../../../../app/store/reducers';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromRegister from './register.reducer';
import * as fromReset from './reset.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AuthState {
    authorization: fromAuth.State;
    registration: fromRegister.State;
    reset: fromReset.State;
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
    registration: fromRegister.reducer,
    reset: fromReset.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthorizationState = createSelector(selectAuthState, (state: AuthState) => state.authorization);
export const selectAuthData = createSelector(selectAuthorizationState, fromAuth.getData);
export const selectAuthError = createSelector(selectAuthorizationState, fromAuth.getError);
export const selectAuthStatus = createSelector(selectAuthorizationState, fromAuth.getStatus);

export const selectRegistrationState = createSelector(selectAuthState, (state: AuthState) => state.registration);
export const selectRegisterMessage = createSelector(selectRegistrationState, fromRegister.getMessage);
export const selectRegisterData = createSelector(selectRegistrationState, fromRegister.getData);
export const selectRegisterError = createSelector(selectRegistrationState, fromRegister.getError);
export const selectRegisterStatus = createSelector(selectRegistrationState, fromRegister.getStatus);

export const selectResetState = createSelector(selectAuthState, (state: AuthState) => state.reset);
export const selectResetMessage = createSelector(selectResetState, fromReset.getMessage);
export const selectResetError = createSelector(selectResetState, fromReset.getError);
export const selectResetStatus = createSelector(selectResetState, fromReset.getStatus);
