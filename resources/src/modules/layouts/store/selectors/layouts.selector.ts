import {createSelector} from '@ngrx/store';

const selectModuleState = createSelector((state: any) => state.moduleLayouts);
export const selectTopTabs = createSelector(selectModuleState, (state) => state.topTabs);
