import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    // shared
    AUTH_LOGOUT = '[auth] logout',
    // LIST_SUCCESS = '[projects] list success',
    // AUTH_LOGOUT = '[auth] logout',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {
    }
}

// export class SharedProjectListAction implements Action {
//     readonly type = SharedActionTypes.LIST_SUCCESS;
//
//     constructor(public payload: any) {
//     }
// }

export type SharedActionsUnion = SharedAuthLogoutAction;
// | SharedProjectListAction;

