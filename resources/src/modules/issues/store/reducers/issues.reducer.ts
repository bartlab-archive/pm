import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';

const normalize = (data, key = 'id') => {
    if (Array.isArray(data)) {
        return data.reduce((acc, item) => ({...acc, [item[key]]: item}), {});
    }

    return {[data[key]]: data};
};

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
            return {
                ...state,
                ...normalize(action.payload.data),
            };

        case IssuesActionTypes.ITEM_SUCCESS: {
            return {
                ...state,
                ...normalize(action.payload.data),
            };
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
            return action.payload.data.map((issue) => issue.id);
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

        case IssuesActionTypes.ALL_ERROR:
            return action.payload;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const status = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
            return RequestStatus.success;

        case IssuesActionTypes.ALL_ERROR:
            return RequestStatus.error;

        case IssuesActionTypes.ALL_REQUEST:
            return RequestStatus.pending;

        case SharedActionTypes.AUTH_LOGOUT:
            return null;

        default:
            return state;
    }
};

const activeId = (state = null, action: IssuesActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case  IssuesActionTypes.ITEM_SUCCESS:
            return action.payload.data.id;
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

// export const getStatus = (state) => state.status;
// export const getError = (state) => state.error;
// export const getEntities = (state) => state.entities;
