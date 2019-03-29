import {Action} from '@ngrx/store';
import {v1} from 'uuid';

import {ResponseError} from '../../../../app/interfaces/api';
import {Tracker} from '../../interfaces/trackers';

export enum TrackersActionTypes {
    TRACKERS_ALL_REQUEST = '[trackers] all request',
    TRACKERS_ALL_SUCCESS = '[trackers] all success',
    TRACKERS_ALL_ERROR = '[trackers] all error',

    TRACKERS_ISSUE_REQUEST = '[trackers] issue request',
    TRACKERS_ISSUE_SUCCESS = '[trackers] issue success',
    TRACKERS_ISSUE_ERROR = '[trackers] issue error',

    TRACKERS_ITEM_REQUEST = '[trackers] item request',
    TRACKERS_ITEM_SUCCESS = '[trackers] item success',
    TRACKERS_ITEM_ERROR = '[trackers] item error',

    TRACKERS_ITEM_SAVE_REQUEST = '[trackers] item save request',
    TRACKERS_ITEM_SAVE_SUCCESS = '[trackers] item save success',
    TRACKERS_ITEM_SAVE_ERROR = '[trackers] item save error',

    TRACKERS_ITEM_REMOVE_REQUEST = '[trackers] item remove request',
    TRACKERS_ITEM_REMOVE_SUCCESS = '[trackers] item remove success',
    TRACKERS_ITEM_REMOVE_ERROR = '[trackers] item remove error',

    TRACKERS_ITEM_RESET = '[trackers] item reset',
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

export class TrackersIssueRequestAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ISSUE_REQUEST;

    constructor(public payload) {
    }
}

export class TrackersIssueErrorAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ISSUE_ERROR;

    constructor(public payload) {
    }
}

export class TrackersIssueSuccessAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ISSUE_SUCCESS;

    constructor(public payload) {
    }
}

// Item
export class TrackersItemRequestAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_REQUEST;
    readonly requestId = v1();

    constructor(public payload: number) {
    }
}

export class TrackersItemErrorAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_ERROR;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class TrackersItemSuccessAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class TrackersItemResetAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_RESET;

    constructor() {
    }
}

// Item save
export class TrackersItemSaveRequestAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_SAVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: Tracker) {
    }
}

export class TrackersItemSaveSuccessAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_SAVE_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class TrackersItemSaveErrorAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_SAVE_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

// Item remove
export class TrackersItemRemoveRequestAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_REMOVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: Tracker) {
    }
}

export class TrackersItemRemoveSuccessAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_REMOVE_SUCCESS;

    constructor(public requestId?: string) {
    }
}

export class TrackersItemRemoveErrorAction implements Action {
    readonly type = TrackersActionTypes.TRACKERS_ITEM_REMOVE_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}


export type TrackersActionsUnion = TrackersAllRequestAction
    | TrackersAllSuccessAction
    | TrackersAllErrorAction

    | TrackersIssueRequestAction
    | TrackersIssueSuccessAction
    | TrackersIssueErrorAction

    | TrackersItemRequestAction
    | TrackersItemSuccessAction
    | TrackersItemErrorAction

    | TrackersItemResetAction

    | TrackersItemSaveRequestAction
    | TrackersItemSaveSuccessAction
    | TrackersItemSaveErrorAction

    | TrackersItemRemoveRequestAction
    | TrackersItemRemoveSuccessAction
    | TrackersItemRemoveErrorAction;

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }
// | IssuesLogoutSuccessAction;
