import {combineReducers} from '@ngrx/store';
import {StatusesActionsUnion, StatusesActionTypes} from '../actions/statuses.action';
import {RequestStatus} from '../../../../app/interfaces/api';

const entities = (state = [], action: StatusesActionsUnion) => {
    switch (action.type) {
        case StatusesActionTypes.STATUSES_ALL_SUCCESS :
            return action.payload.data;
        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

// const meta = (state = null, action: StatusesActionsUnion) => {
//     switch (action.type) {
//         case StatusesActionTypes.ALL_SUCCESS:
//             return action.payload.meta;
//
//         // case StatusesActionTypes.AUTH_LOGOUT:
//         //     return null;
//
//         default:
//             return state;
//     }
// };

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
    // meta,
    status,
    error
});

// export const getStatus = (state) => state.status;
// export const getError = (state) => state.error;
// export const getEntities = (state) => state.entities;
