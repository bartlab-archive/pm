import {combineReducers} from '@ngrx/store';
import {TrackersActionsUnion, TrackersActionTypes} from '../actions/trackers.action';
import {RequestStatus} from '../../../../app/interfaces/api';

const entities = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_SUCCESS :
            return action.payload.data;
        // case TrackersActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

// const meta = (state = null, action: TrackersActionsUnion) => {
//     switch (action.type) {
//         case TrackersActionTypes.ALL_SUCCESS:
//             return action.payload.meta;
//
//         // case TrackersActionTypes.AUTH_LOGOUT:
//         //     return null;
//
//         default:
//             return state;
//     }
// };

const error = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_REQUEST:
            return null;


        case TrackersActionTypes.TRACKERS_ALL_ERROR:
            return action.payload;

        // case TrackersActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

const status = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_SUCCESS:
            return RequestStatus.success;

        case TrackersActionTypes.TRACKERS_ALL_ERROR:
            return RequestStatus.error;

        case TrackersActionTypes.TRACKERS_ALL_REQUEST:
            return RequestStatus.pending;

        // case TrackersActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

export const trackersReducers = combineReducers({
    entities,
    // meta,
    status,
    error
});

// export const getStatus = (state) => state.status;
// export const getError = (state) => state.error;
// export const getEntities = (state) => state.entities;
