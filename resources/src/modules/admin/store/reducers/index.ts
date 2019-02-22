// import * as fromRoot from '../../../../app/store/reducers';
// import {
//     // ActionReducer,
//     ActionReducerMap,
//     createFeatureSelector,
//     createSelector,
//     MetaReducer,
// } from '@ngrx/store';
// import {categories, CategoriesState} from './categories.reducer';
//
// export const metaReducers: Array<MetaReducer<any, any>> = [];
//
// export const reducers: ActionReducerMap<any> = {
//     categories: categories,
// };
//
// export interface AdminState {
//     categories: CategoriesState;
// }
//
// export interface State extends fromRoot.State {
//     moduleAdmin: AdminState;
// }
//
// export const selectAdminState = createFeatureSelector<State, AdminState>('moduleAdmin');
// export const selectAdminCategories = createSelector(selectAdminState, (state) => state.categories);
