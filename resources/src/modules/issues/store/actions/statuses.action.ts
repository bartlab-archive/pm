import {Action} from '@ngrx/store';

export enum StatusesActionTypes {
    STATUSES_ALL_REQUEST = '[statuses] all request',
    STATUSES_ALL_ERROR = '[statuses] all error',
    STATUSES_ALL_SUCCESS = '[statuses] all success',
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

export type StatusesActionsUnion = StatusesAllRequestAction
    | StatusesAllErrorAction
    | StatusesAllSuccessAction;
// | IssuesLogoutSuccessAction;
