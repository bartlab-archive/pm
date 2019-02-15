import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromMenus from './menus.reducer';

export const featureName = 'moduleLayouts';
export interface LayoutsState {
    menus: fromMenus.State;
}

export interface State extends fromRoot.State {
    [featureName]: LayoutsState;
}

export const reducers: ActionReducerMap<LayoutsState> = {
    menus: fromMenus.reducer,
};

export const selectModuleState = createFeatureSelector<State, LayoutsState>(
    featureName,
);

export const selectMenusState = createSelector(
    selectModuleState,
    (state: LayoutsState) => state.menus,
);
