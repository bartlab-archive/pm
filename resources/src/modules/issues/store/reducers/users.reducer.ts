import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:

            return {
                ...state,
                ...action.payload.entities.users
            };

        case IssuesActionTypes.ITEM_SUCCESS:

            return {
                ...state,
                ...action.payload.entities.users
            };

        case SharedActionTypes.AUTH_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const reducers = combineReducers({
    entities,
});

export const selectEntities = state => state.entities;
