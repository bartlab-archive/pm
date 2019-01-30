import {combineReducers} from '@ngrx/store';
import {TrackersActionsUnion, TrackersActionTypes} from '../actions/trackers.action';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {RequestStatus} from '../../../../app/interfaces/api';
import {updateStateEntities} from '../../../../app/store/utils';

const entities = (state = {}, action: TrackersActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_SUCCESS :
        case IssuesActionTypes.ITEM_SUCCESS :
            return updateStateEntities(state, action.payload.entities.trackers);

        default:
            return state;
    }
};

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

const ids = (state = [], action: TrackersActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_SUCCESS :
            return action.payload.result;

        default:
            return state;
    }
};

export const trackersReducers = combineReducers({
    entities,
    ids,
    status,
    error
});

