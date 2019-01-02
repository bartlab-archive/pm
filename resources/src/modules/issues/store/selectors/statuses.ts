import {selectStatusesState} from "../reducers";
import {createSelector} from "@ngrx/store";

export const selectStatusesStatus = createSelector(selectStatusesState, (state) => state.status);
export const selectStatusesError = createSelector(selectStatusesState, (state) => state.error);
