import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    // shared
    AUTH_LOGOUT = '[auth] logout',
    // AUTH_LOGOUT = '[auth] logout',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {
    }
}

export type SharedActionsUnion = SharedAuthLogoutAction;

