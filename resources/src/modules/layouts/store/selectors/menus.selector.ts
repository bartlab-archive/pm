import {createSelector} from '@ngrx/store';
import {selectMenusState} from '../reducers';

export const selectTabs = createSelector(
    selectMenusState,
    (state) => state.tabs,
);
