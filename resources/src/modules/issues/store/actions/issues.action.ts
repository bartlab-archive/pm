import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';

export enum IssuesActionTypes {
    ALL_REQUEST = '[issues] all request',
    ALL_ERROR = '[issues] all error',
    ALL_SUCCESS = '[issues] all success',
    PRELOAD_REQUEST = '[issues] preload',
    ITEM_REQUEST = '[issues] item request',
    ITEM_ERROR = '[issues] item error',
    ITEM_SUCCESS = '[issues] item success',

    ITEM_WATCH_REQUEST = '[issues] item watch request',
    ITEM_WATCH_SUCCESS = '[issues] item watch success',
    ITEM_WATCH_ERROR = '[issues] item watch error',

    ITEM_UNWATCH_REQUEST = '[issues] item unwatch request',
    ITEM_UNWATCH_SUCCESS = '[issues] item unwatch success',
    ITEM_UNWATCH_ERROR = '[issues] item unwatch error',
    // shared
    // AUTH_LOGOUT = '[Auth] Logout',
}

// All
export class IssuesAllRequestAction implements Action {
    readonly type = IssuesActionTypes.ALL_REQUEST;

    constructor(public payload) {
    }
}

export class IssuesAllErrorAction implements Action {
    readonly type = IssuesActionTypes.ALL_ERROR;

    constructor(public payload) {
    }
}

export class IssuesAllSuccessAction implements Action {
    readonly type = IssuesActionTypes.ALL_SUCCESS;

    constructor(public payload) {
    }
}

export class IssuesPreloadRequestAction implements Action {
    readonly type = IssuesActionTypes.PRELOAD_REQUEST;

    constructor() {
    }
}

// Item
export class ItemRequestAction implements Action {
    readonly type = IssuesActionTypes.ITEM_REQUEST;

    constructor(public payload: number) {
    }
}

export class ItemErrorAction implements Action {
    readonly type = IssuesActionTypes.ITEM_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class ItemSuccessAction implements Action {
    readonly type = IssuesActionTypes.ITEM_SUCCESS;

    constructor(public payload: any) {
    }
}

// Watch
export class ItemWatchRequestAction implements Action {
    readonly type = IssuesActionTypes.ITEM_WATCH_REQUEST;

    constructor(public payload) {
    }
}

export class ItemWatchErrorAction implements Action {
    readonly type = IssuesActionTypes.ITEM_WATCH_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class ItemWatchSuccessAction implements Action {
    readonly type = IssuesActionTypes.ITEM_WATCH_SUCCESS;

    constructor(public payload) {
    }
}

// Unwatch
export class ItemUnwatchRequestAction implements Action {
    readonly type = IssuesActionTypes.ITEM_UNWATCH_REQUEST;

    constructor(public payload: number) {
    }
}

export class ItemUnwatchErrorAction implements Action {
    readonly type = IssuesActionTypes.ITEM_UNWATCH_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class ItemUnwatchSuccessAction implements Action {
    readonly type = IssuesActionTypes.ITEM_UNWATCH_SUCCESS;

    constructor(public payload) {
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

    | ItemErrorAction
    | ItemRequestAction
    | ItemSuccessAction

    | ItemWatchRequestAction
    | ItemWatchErrorAction
    | ItemWatchSuccessAction

    | ItemUnwatchRequestAction
    | ItemUnwatchErrorAction
    | ItemUnwatchSuccessAction;
// | IssuesLogoutSuccessAction;
