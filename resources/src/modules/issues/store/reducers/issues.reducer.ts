import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../../../../app/store/utils';

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ISSUES_ALL_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_SUCCESS:
            return updateStateEntities(state, action.payload.entities.issues);

        case IssuesActionTypes.ISSUES_ITEM_SAVE_SUCCESS:
            return updateStateEntities(state, {
                [action.payload.result]: action.payload.entities.issues[action.payload.result],
            });

        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_SUCCESS:
            return updateStateEntities(state, {
                [action.payload.id]: action.payload,
            });

        case SharedActionTypes.AUTH_LOGOUT:
            return null;
        default:
            return state;
    }
};

export const ids = (state: Array<number> = [], action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ISSUES_ALL_SUCCESS:
            return action.payload.result;
        case SharedActionTypes.AUTH_LOGOUT:
            return null;
        default:
            return state;
    }
};

const meta = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ISSUES_ALL_SUCCESS:
            return action.payload.meta;
        case SharedActionTypes.AUTH_LOGOUT:
            return null;
        default:
            return state;
    }
};

const error = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ISSUES_ALL_REQUEST:
            return null;
        case  IssuesActionTypes.ISSUES_ITEM_REQUEST:
            return null;
        case IssuesActionTypes.ISSUES_ALL_ERROR:
            return action.payload;
        case  IssuesActionTypes.ISSUES_ITEM_ERROR:
            return action.payload;
        case SharedActionTypes.AUTH_LOGOUT:
            return null;
        default:
            return state;
    }
};

const status = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {

        case IssuesActionTypes.ISSUES_ALL_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_SAVE_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_REQUEST:
            return RequestStatus.pending;

        case IssuesActionTypes.ISSUES_ALL_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_SAVE_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ISSUES_ALL_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_SAVE_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_ERROR:
            return RequestStatus.error;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const activeId = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case  IssuesActionTypes.ISSUES_ITEM_SUCCESS:
        case  IssuesActionTypes.ISSUES_ITEM_SAVE_SUCCESS:
            return action.payload.result;
        default:
            return state;
    }
};

const requestId = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ISSUES_ITEM_SAVE_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_SAVE_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_SAVE_ERROR:
        case IssuesActionTypes.ISSUES_ALL_REQUEST:
        case IssuesActionTypes.ISSUES_ALL_SUCCESS:
        case IssuesActionTypes.ISSUES_ALL_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_UNWATCH_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_WATCH_ERROR:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_REQUEST:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_SUCCESS:
        case IssuesActionTypes.ISSUES_ITEM_REMOVE_ERROR:
            return action.requestId;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;
        default:
            return state;
    }
};

export const issuesReducers = combineReducers({
    entities,
    ids,
    activeId,
    requestId,
    meta,
    status,
    error,
});
