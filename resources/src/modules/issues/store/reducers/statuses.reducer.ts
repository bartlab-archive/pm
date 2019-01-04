import {combineReducers} from '@ngrx/store';
import {StatusesActionsUnion, StatusesActionTypes} from '../actions/statuses.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {IssuesActionsUnion, IssuesActionTypes} from "../actions/issues.action";
import {updateStateEntities} from "../utils/ngrx-utils";

const entities = (state = [], action: StatusesActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_SUCCESS :
            return updateStateEntities(state, action.payload.entities.statuses);
        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;
        case IssuesActionTypes.ITEM_SUCCESS :
            return updateStateEntities(state, action.payload.entities.statuses);

        default:
            return state;
    }
};

const error = (state = null, action: StatusesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_REQUEST:
            return null;

        case StatusesActionTypes.STATUSES_ALL_ERROR:
            return action.payload;

        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

const status = (state = null, action: StatusesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_SUCCESS:
            return RequestStatus.success;

        case StatusesActionTypes.STATUSES_ALL_ERROR:
            return RequestStatus.error;

        case StatusesActionTypes.STATUSES_ALL_REQUEST:
            return RequestStatus.pending;

        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

export const statusesReducers = combineReducers({
    entities,
    status,
    error
});
