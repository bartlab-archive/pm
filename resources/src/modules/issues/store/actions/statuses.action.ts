import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';

export enum StatusesActionTypes {
    STATUSES_ALL_REQUEST = '[statuses] all request',
    STATUSES_ALL_ERROR = '[statuses] all error',
    STATUSES_ALL_SUCCESS = '[statuses] all success',

    STATUSES_ITEM_REQUEST = '[statuses] item request',
    STATUSES_ITEM_ERROR = '[statuses] item error',
    STATUSES_ITEM_SUCCESS = '[statuses] item success',
}

export class StatusesAllRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_REQUEST;

    constructor() {
    }
}

export class StatusesAllErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_ERROR;

    constructor(public payload) {
    }
}

export class StatusesAllSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_SUCCESS;

    constructor(public payload) {
    }
}

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

// Item
export class StatusesItemRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_REQUEST;

    constructor(public payload: number) {
    }
}

export class StatusesItemErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class StatusesItemSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_SUCCESS;

    constructor(public payload: any) {
    }
}

export type StatusesActionsUnion = StatusesAllRequestAction
    | StatusesAllErrorAction
    | StatusesAllSuccessAction
    | StatusesItemRequestAction
    | StatusesItemErrorAction
    | StatusesItemSuccessAction;
// | IssuesLogoutSuccessAction;
