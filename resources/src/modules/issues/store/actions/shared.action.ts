import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    // ALL_REQUEST = '[Issues] All Request',
    // ALL_ERROR = '[Issues] All Error',
    // ALL_SUCCESS = '[Issues] All Success',

    // shared
    AUTH_LOGOUT = '[auth] logout',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {
    }
}
//
// export class IssuesAllErrorAction implements Action {
//     readonly type = IssuesActionTypes.ALL_ERROR;
//
//     constructor(public payload) {
//     }
// }
//
// export class IssuesAllSuccessAction implements Action {
//     readonly type = IssuesActionTypes.ALL_SUCCESS;
//
//     constructor(public payload) {
//     }
// }

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

export type SharedActionsUnion = SharedAuthLogoutAction;
    // | IssuesAllErrorAction
    // | IssuesAllSuccessAction;
// | IssuesLogoutSuccessAction;
