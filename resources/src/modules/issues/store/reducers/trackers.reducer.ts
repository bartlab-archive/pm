import {combineReducers} from '@ngrx/store';

import {RequestStatus} from '../../../../app/interfaces/api';
import {updateStateEntities} from '../../../../app/store/utils';
import {TrackersActionsUnion, TrackersActionTypes} from '../actions/trackers.action';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';

const entities = (state = {}, action: TrackersActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_SUCCESS :
        case IssuesActionTypes.ISSUES_ITEM_SUCCESS :
        case TrackersActionTypes.TRACKERS_ITEM_SUCCESS:
            return updateStateEntities(state, action.payload.entities.trackers);

        case TrackersActionTypes.TRACKERS_ISSUE_SUCCESS:
            // console.log(action.payload);
            return state;

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

const error = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case TrackersActionTypes.TRACKERS_ALL_REQUEST:
        case TrackersActionTypes.TRACKERS_ITEM_REQUEST:
        case TrackersActionTypes.TRACKERS_ISSUE_REQUEST:
            return null;

        case TrackersActionTypes.TRACKERS_ALL_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_ERROR:
        case TrackersActionTypes.TRACKERS_ISSUE_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_SAVE_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_REMOVE_ERROR:
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
        case TrackersActionTypes.TRACKERS_ISSUE_SUCCESS:
        case TrackersActionTypes.TRACKERS_ITEM_SUCCESS:
        case TrackersActionTypes.TRACKERS_ITEM_SAVE_SUCCESS:
        case TrackersActionTypes.TRACKERS_ITEM_REMOVE_SUCCESS:
            return RequestStatus.success;

        case TrackersActionTypes.TRACKERS_ALL_REQUEST:
        case TrackersActionTypes.TRACKERS_ISSUE_REQUEST:
        case TrackersActionTypes.TRACKERS_ITEM_REQUEST:
        case TrackersActionTypes.TRACKERS_ITEM_SAVE_REQUEST:
        case TrackersActionTypes.TRACKERS_ITEM_REMOVE_REQUEST:
            return RequestStatus.pending;

        case TrackersActionTypes.TRACKERS_ALL_ERROR:
        case TrackersActionTypes.TRACKERS_ISSUE_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_SAVE_ERROR:
        case TrackersActionTypes.TRACKERS_ITEM_REMOVE_ERROR:
            return RequestStatus.error;

        // case TrackersActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

const requestId = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case  TrackersActionTypes.TRACKERS_ITEM_REQUEST:
        case  TrackersActionTypes.TRACKERS_ITEM_SUCCESS:
        case  TrackersActionTypes.TRACKERS_ITEM_ERROR:
        case  TrackersActionTypes.TRACKERS_ITEM_SAVE_REQUEST:
        case  TrackersActionTypes.TRACKERS_ITEM_SAVE_SUCCESS:
        case  TrackersActionTypes.TRACKERS_ITEM_SAVE_ERROR:
        case  TrackersActionTypes.TRACKERS_ITEM_REMOVE_REQUEST:
        case  TrackersActionTypes.TRACKERS_ITEM_REMOVE_SUCCESS:
        case  TrackersActionTypes.TRACKERS_ITEM_REMOVE_ERROR:
            return action.requestId;

        case TrackersActionTypes.TRACKERS_ITEM_RESET:
            return null;
        default:
            return state;
    }
};

const activeId = (state = null, action: TrackersActionsUnion) => {
    switch (action.type) {
        case  TrackersActionTypes.TRACKERS_ITEM_SUCCESS:
            return action.payload.result;
        case TrackersActionTypes.TRACKERS_ITEM_RESET:
            return null;
        default:
            return state;
    }
};

export const trackersReducers = combineReducers({
    entities,
    ids,
    status,
    requestId,
    error,
    activeId,
});

