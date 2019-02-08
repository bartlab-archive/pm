import {combineReducers} from '@ngrx/store';
import {WikiActionsUnion, WikiActionTypes} from '../actions/wiki.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../../../../app/store/utils';

const entities = (state = {}, action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.LIST_SUCCESS:
        case WikiActionTypes.ITEM_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.wiki);
        }

        case SharedActionTypes.AUTH_LOGOUT: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const ids = (state: Array<number> = [], action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.LIST_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
    }
};

const meta = (state = null, action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.LIST_SUCCESS: {
            return action.payload.meta;
        }

        case SharedActionTypes.AUTH_LOGOUT: {
            return null;
        }

        default: {
            return state;
        }
    }
};

const error = (state = null, action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.LIST_REQUEST:
        case WikiActionTypes.LIST_SUCCESS:
        case WikiActionTypes.ITEM_REQUEST:
        case WikiActionTypes.ITEM_SUCCESS:
        case SharedActionTypes.AUTH_LOGOUT: {
            return null;
        }

        case WikiActionTypes.LIST_ERROR:
        case WikiActionTypes.ITEM_ERROR: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

const status = (state = null, action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.LIST_REQUEST:
        case WikiActionTypes.ITEM_REQUEST: {
            return RequestStatus.pending;
        }

        case WikiActionTypes.LIST_SUCCESS:
        case WikiActionTypes.ITEM_SUCCESS: {
            return RequestStatus.success;
        }

        case WikiActionTypes.LIST_ERROR:
        case WikiActionTypes.ITEM_ERROR: {
            return RequestStatus.error;
        }

        case SharedActionTypes.AUTH_LOGOUT: {
            return null;
        }

        default: {
            return state;
        }
    }
};

const activeId = (state = null, action: WikiActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case WikiActionTypes.ITEM_SUCCESS:
            return action.payload.result;
        default:
            return state;
    }
};

export const wikiReducers = combineReducers({
    entities,
    ids,
    activeId,
    meta,
    status,
    error,
});
