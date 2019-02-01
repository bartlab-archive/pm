import {combineReducers} from '@ngrx/store';
import {StatusesActionsUnion, StatusesActionTypes} from '../actions/statuses.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {updateStateEntities} from '../../../../app/store/utils';
import {SharedActionsUnion} from '../actions/shared.action';

const entities = (state = [], action: StatusesActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_SUCCESS :
        case IssuesActionTypes.ITEM_SUCCESS :
            return updateStateEntities(state, action.payload.entities.statuses);

        default:
            return state;
    }
};

export const ids = (state = [], action: StatusesActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
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
        case StatusesActionTypes.STATUSES_ITEM_SUCCESS:
            return RequestStatus.success;

        case StatusesActionTypes.STATUSES_ALL_ERROR:
        case StatusesActionTypes.STATUSES_ITEM_ERROR:
            return RequestStatus.error;

        case StatusesActionTypes.STATUSES_ALL_REQUEST:
        case StatusesActionTypes.STATUSES_ITEM_REQUEST:
            return RequestStatus.pending;

        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

const activeId = (state = null, action: StatusesActionsUnion) => {
    switch (action.type) {
        case  StatusesActionTypes.STATUSES_ITEM_SUCCESS:
            return action.payload.result;
        default:
            return state;
    }
};

export const statusesReducers = combineReducers({
    entities,
    ids,
    status,
    error,
    activeId
});
