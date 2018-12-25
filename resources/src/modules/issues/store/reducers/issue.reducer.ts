import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';

const data = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ITEM_SUCCESS:
            return action.payload.data;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};


const error = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ITEM_REQUEST:
            return null;

        case IssuesActionTypes.ITEM_ERROR:
            return action.payload;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const status = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ITEM_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ITEM_ERROR:
            return RequestStatus.error;

        case IssuesActionTypes.ITEM_REQUEST:
            return RequestStatus.pending;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

export const issueReducers = combineReducers({
    data,
    status,
    error
});
