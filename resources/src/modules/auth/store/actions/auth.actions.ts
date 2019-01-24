import { Action } from '@ngrx/store';
import { FormResponseError } from '../../../../app/interfaces/api';
import { AuthData, LoginData, User } from '../../interfaces/auth';

export enum ActionTypes {
    LOGIN_REQUEST = '[auth] login request',
    LOGIN_ERROR = '[auth] login set error',
    LOGIN_SUCCESS = '[auth] login success',
    LOGOUT = '[auth] logout',
    LOGIN_CLEAR = '[auth] login clear',
    PRELOAD_REQUEST = '[auth] preload request',
    PRELOAD_SUCCESS = '[auth] preload success',
    PRELOAD_ERROR = '[auth] preload error',
}

export class LoginRequestAction implements Action {
    readonly type = ActionTypes.LOGIN_REQUEST;

    constructor(public payload: LoginData) {}
}

export class LoginErrorAction implements Action {
    readonly type = ActionTypes.LOGIN_ERROR;

    constructor(public payload: FormResponseError) {}
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: AuthData) {}
}

export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;

    constructor() {}
}

export class LoginClearAction implements Action {
    readonly type = ActionTypes.LOGIN_CLEAR;

    constructor() {}
}

export class PreloadRequestAction implements Action {
    readonly type = ActionTypes.PRELOAD_REQUEST;

    constructor() {}
}

export class PreloadSuccessAction implements Action {
    readonly type = ActionTypes.PRELOAD_SUCCESS;

    constructor(public payload: User) {}
}

export class PreloadErrorAction implements Action {
    readonly type = ActionTypes.PRELOAD_ERROR;

    constructor(public payload: FormResponseError) {}
}

export type ActionsUnion =
    | LoginRequestAction
    | LoginErrorAction
    | LoginSuccessAction
    | LogoutAction
    | PreloadRequestAction
    | PreloadSuccessAction
    | PreloadErrorAction
    | LoginClearAction;
