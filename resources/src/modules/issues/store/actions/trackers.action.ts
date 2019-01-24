import {Action} from '@ngrx/store';

export enum TrackersActionTypes {
    TRACKERS_ALL_REQUEST = '[trackers] all request',
    TRACKERS_ALL_ERROR = '[trackers] all error',
    TRACKERS_ALL_SUCCESS = '[trackers] all success',
}

export class TrackersAllRequestAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ALL_REQUEST;

    constructor(public payload?) {
    }
}

export class TrackersAllErrorAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ALL_ERROR;

    constructor(public payload) {
    }
}

export class TrackersAllSuccessAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ALL_SUCCESS;

    constructor(public payload) {
    }
}

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

export type TrackersActionsUnion = TrackersAllRequestAction
    | TrackersAllErrorAction
    | TrackersAllSuccessAction;
// | IssuesLogoutSuccessAction;
