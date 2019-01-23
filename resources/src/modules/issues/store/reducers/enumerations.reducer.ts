import {combineReducers} from '@ngrx/store';
import {RequestStatus} from '../../../../app/interfaces/api';
import {EnumerationsActionsUnion, EnumerationsActionTypes} from '../actions/enumerations.action';
import {updateStateEntities} from '../utils/ngrx-utils';
import {IssuesActionTypes, IssuesActionsUnion} from '../actions/issues.action';

const entities = (state = [], action: EnumerationsActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case EnumerationsActionTypes.ENUMERATIONS_SUCCESS :
        case IssuesActionTypes.ITEM_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.priorities);
        }

        default:
            return state;
    }
};

export const ids = (state = [], action: EnumerationsActionsUnion) => {
    switch (action.type) {
        case EnumerationsActionTypes.ENUMERATIONS_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
    }
};

const error = (state = null, action: EnumerationsActionsUnion) => {
    switch (action.type) {
        case EnumerationsActionTypes.ENUMERATIONS_ERROR:
            return action.payload;

        default:
            return state;
    }
};

const status = (state = null, action: EnumerationsActionsUnion) => {
    switch (action.type) {
        case EnumerationsActionTypes.ENUMERATIONS_SUCCESS:
            return RequestStatus.success;

        case EnumerationsActionTypes.ENUMERATIONS_ERROR:
            return RequestStatus.error;

        case EnumerationsActionTypes.ENUMERATIONS_REQUEST:
            return RequestStatus.pending;

        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

export const enumerationsReducers = combineReducers({
    entities,
    ids,
    status,
    error
});