import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';
import {IssueSaveRequest} from '../../interfaces/issues';
import {v1} from 'uuid';

export enum IssuesActionTypes {
    ISSUES_ALL_REQUEST = '[issues] all request',
    ISSUES_ALL_ERROR = '[issues] all error',
    ISSUES_ALL_SUCCESS = '[issues] all success',

    ISSUES_PRELOAD_REQUEST = '[issues] preload',
    ISSUES_ITEM_RESET = '[issues] reset',

    ISSUES_ITEM_REQUEST = '[issues] item request',
    ISSUES_ITEM_ERROR = '[issues] item error',
    ISSUES_ITEM_SUCCESS = '[issues] item success',

    ISSUES_ITEM_WATCH_REQUEST = '[issues] item watch request',
    ISSUES_ITEM_WATCH_SUCCESS = '[issues] item watch success',
    ISSUES_ITEM_WATCH_ERROR = '[issues] item watch error',

    ISSUES_ITEM_UNWATCH_REQUEST = '[issues] item unwatch request',
    ISSUES_ITEM_UNWATCH_SUCCESS = '[issues] item unwatch success',
    ISSUES_ITEM_UNWATCH_ERROR = '[issues] item unwatch error',

    ISSUES_ITEM_SAVE_REQUEST = '[issues] item save request',
    ISSUES_ITEM_SAVE_ERROR = '[issues] item save error',
    ISSUES_ITEM_SAVE_SUCCESS = '[issues] item save success',

    ISSUES_ITEM_REMOVE_REQUEST = '[issues] item remove request',
    ISSUES_ITEM_REMOVE_SUCCESS = '[issues] item remove success',
    ISSUES_ITEM_REMOVE_ERROR = '[issues] item remove error',

    // shared
    // AUTH_LOGOUT = '[Auth] Logout',
}

export class IssuesItemResetAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_RESET;

    constructor() {
    }
}

// All
export class IssuesAllRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ALL_REQUEST;
    readonly requestId = v1();

    constructor(public payload) {

    }
}

export class IssuesAllErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ALL_ERROR;

    constructor(public payload, public requestId?: string) {
    }
}

export class IssuesAllSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ALL_SUCCESS;

    constructor(public payload, public requestId?: string) {
    }
}

export class IssuesPreloadRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_PRELOAD_REQUEST;
    readonly requestId = v1();

    constructor() {
    }
}

// Item
export class IssuesItemRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_REQUEST;
    readonly requestId = v1();

    constructor(public payload: number) {
    }
}

export class IssuesItemErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

export class IssuesItemSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

// Watch
export class IssuesItemWatchRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_WATCH_REQUEST;
    readonly requestId = v1();

    constructor(public payload) {
    }
}

export class IssuesItemWatchErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_WATCH_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

export class IssuesItemWatchSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_WATCH_SUCCESS;

    constructor(public payload, public requestId?: string) {
    }
}

// Unwatch
export class IssuesItemUnwatchRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_UNWATCH_REQUEST;
    readonly requestId = v1();

    constructor(public payload: number) {
    }
}

export class IssuesItemUnwatchErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_UNWATCH_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

export class IssuesItemUnwatchSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_UNWATCH_SUCCESS;

    constructor(public payload, public requestId?: string) {
    }
}

export class IssuesItemSaveRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_SAVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: IssueSaveRequest) {
    }
}

export class IssuesItemSaveErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_SAVE_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

export class IssuesItemSaveSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_SAVE_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class IssuesItemRemoveRequestAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_REMOVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: number) {
    }
}

export class IssuesItemRemoveSuccessAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_REMOVE_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class IssuesItemRemoveErrorAction implements Action {
    readonly type = IssuesActionTypes.ISSUES_ITEM_REMOVE_ERROR;

    constructor(public payload: any, public requestId?: string) {
    }
}

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

export type IssuesActionsUnion =
    | IssuesAllRequestAction
    | IssuesAllErrorAction
    | IssuesPreloadRequestAction
    | IssuesAllSuccessAction

    | IssuesItemErrorAction
    | IssuesItemRequestAction
    | IssuesItemSuccessAction

    | IssuesItemWatchRequestAction
    | IssuesItemWatchErrorAction
    | IssuesItemWatchSuccessAction

    | IssuesItemUnwatchRequestAction
    | IssuesItemUnwatchErrorAction
    | IssuesItemUnwatchSuccessAction

    | IssuesItemSaveRequestAction
    | IssuesItemSaveErrorAction
    | IssuesItemSaveSuccessAction

    | IssuesItemRemoveRequestAction
    | IssuesItemRemoveSuccessAction
    | IssuesItemRemoveErrorAction

    | IssuesItemResetAction;
// | IssuesLogoutSuccessAction;
