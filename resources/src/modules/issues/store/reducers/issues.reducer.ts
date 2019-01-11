import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../utils/ngrx-utils';

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
            return updateStateEntities(state, action.payload.entities.issues);

        case IssuesActionTypes.ITEM_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.issues);
        }

        case IssuesActionTypes.ITEM_UPDATE_SUCCESS: {
            return updateStateEntities(state, {
                [action.payload.id]: action.payload,
            });
        }

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

export const ids = (state: Array<number> = [], action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
    }
};

const meta = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
            return action.payload.meta;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const error = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_REQUEST:
            return null;

        case  IssuesActionTypes.ITEM_REQUEST:
            return null;

        case IssuesActionTypes.ALL_ERROR:
            return action.payload;

        case  IssuesActionTypes.ITEM_ERROR:
            return action.payload;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const status = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
// Request
        case IssuesActionTypes.ALL_REQUEST:
            return RequestStatus.pending;

        case IssuesActionTypes.ALL_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ALL_ERROR:
            return RequestStatus.error;
// Item
        case IssuesActionTypes.ITEM_REQUEST:
            return RequestStatus.pending;

        case IssuesActionTypes.ITEM_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ITEM_ERROR:
            return RequestStatus.error;
// Update
        case IssuesActionTypes.ITEM_UPDATE_REQUEST:
            return RequestStatus.pending;

        case IssuesActionTypes.ITEM_UPDATE_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ITEM_UPDATE_ERROR:
            return RequestStatus.error;
// Logout
        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const activeId = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case  IssuesActionTypes.ITEM_SUCCESS:
            return action.payload.result;
        default:
            return state;
    }
};

export const issuesReducers = combineReducers({
    entities,
    ids,
    activeId,
    meta,
    status,
    error
});
