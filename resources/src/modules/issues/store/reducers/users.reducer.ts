import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../utils/ngrx-utils';

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
            return updateStateEntities(state, action.payload.entities.users);

        case IssuesActionTypes.ITEM_SUCCESS:
            return updateStateEntities(state, action.payload.entities.users);

        case SharedActionTypes.AUTH_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const userReducers = combineReducers({
    entities,
});
