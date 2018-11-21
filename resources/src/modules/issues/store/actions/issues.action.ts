import {Action} from '@ngrx/store';

export enum IssuesActionTypes {
    ALL_REQUEST = '[issues] all request',
    ALL_ERROR = '[issues] all error',
    ALL_SUCCESS = '[issues] all success',

    // shared
    // AUTH_LOGOUT = '[Auth] Logout',
}

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

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

export type IssuesActionsUnion = IssuesAllRequestAction
    | IssuesAllErrorAction
    | IssuesAllSuccessAction;
// | IssuesLogoutSuccessAction;
