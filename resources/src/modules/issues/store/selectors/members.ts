import {createSelector} from '@ngrx/store';
import {selectMembersState} from '../reducers';

export const selectMembersEntities = createSelector(selectMembersState, state => state.entities);