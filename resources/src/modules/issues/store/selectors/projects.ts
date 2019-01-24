import {createSelector} from '@ngrx/store';
import {selectProjectsState} from '../reducers';

export const selectProjectsMy = createSelector(selectProjectsState, (state: any) => state.my);