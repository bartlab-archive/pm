import {createSelector} from '@ngrx/store';
import {selectMenusState} from '../reducers';

export const selectTabs = createSelector(
    selectMenusState,
    (state) => state.tabs,
);

export const selectTopItems = createSelector(
    selectMenusState,
    (state) => state.top,
);

export const selectLeftItems = createSelector(
    selectMenusState,
    (state) => state.left,
);

export const selectRightItems = createSelector(
    selectMenusState,
    (state) => state.right,
);
