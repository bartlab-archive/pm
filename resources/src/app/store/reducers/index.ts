import {
    MetaReducer,
    ActionReducerMap,
    // createFeatureSelector,
    // createSelector,
    // ActionReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';
// import {localStorageSync} from 'ngrx-store-localstorage';
// import {isDevMode} from '@angular/core';

/**
 * he reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */

const environment = {production: process.env.NODE_ENV === 'production'};

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync({keys: ['auth'], rehydrate: true})(reducer);
// }

export const metaReducers: Array<MetaReducer<any, any>> = !environment.production
    ? [storeFreeze]
    : [];

export interface State {
    router: fromRouter.RouterReducerState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
};
