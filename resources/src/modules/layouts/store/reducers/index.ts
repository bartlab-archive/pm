import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import {State as RootState} from '../../../../app/store/reducers';
import {menusReducer, MenuState} from './menus.reducer';

export const featureName = 'moduleLayouts';

export interface LayoutsState {
    menus: MenuState;
}

export interface State extends RootState {
    [featureName]: LayoutsState;
}

export const reducers: ActionReducerMap<LayoutsState> = {
    menus: menusReducer,
};

export const selectModuleState = createFeatureSelector<State, LayoutsState>(
    featureName,
);

export const selectMenusState = createSelector(
    selectModuleState,
    (state: LayoutsState) => state.menus,
);
