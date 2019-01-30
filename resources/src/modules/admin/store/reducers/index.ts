import * as fromRoot from '../../../../app/store/reducers';
import {
    // ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import {categories, CategoriesState} from './categories.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [];

export const reducers: ActionReducerMap<any> = {
    categories: categories,
};

export interface AdminState {
    categories: CategoriesState;
}

export interface State extends fromRoot.State {
    moduleAdmin: AdminState;
}

export const selectAdminState = createFeatureSelector<State, AdminState>('moduleAdmin');
export const selectAdminCategories = createSelector(selectAdminState, (state) => state.categories);

// export const selectAuthorizationState = createSelector(selectAuthState, (state: AuthState) => state.authorization);
// export const selectAuthData = createSelector(selectAuthorizationState, fromAuth.getData);
// export const selectAuthError = createSelector(selectAuthorizationState, fromAuth.getError);
// export const selectAuthStatus = createSelector(selectAuthorizationState, fromAuth.getStatus);
//
// export const selectRegistrationState = createSelector(selectAuthState, (state: AuthState) => state.registration);
// export const selectRegisterMessage = createSelector(selectRegistrationState, fromRegister.getMessage);
// export const selectRegisterData = createSelector(selectRegistrationState, fromRegister.getData);
// export const selectRegisterError = createSelector(selectRegistrationState, fromRegister.getError);
// export const selectRegisterStatus = createSelector(selectRegistrationState, fromRegister.getStatus);
//
// export const selectResetState = createSelector(selectAuthState, (state: AuthState) => state.reset);
// export const selectResetMessage = createSelector(selectResetState, fromReset.getMessage);
// export const selectResetError = createSelector(selectResetState, fromReset.getError);
// export const selectResetStatus = createSelector(selectResetState, fromReset.getStatus);
