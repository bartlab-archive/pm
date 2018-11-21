import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {AuthData, LoginData} from '../../interfaces/auth';

export enum ActionTypes {
    LOGIN_REQUEST = '[auth] login request',
    LOGIN_ERROR = '[auth] login set error',
    LOGIN_SUCCESS = '[auth] login success',
    LOGOUT = '[auth] logout',
    LOGIN_CLEAR = '[auth] login clear',
}

export class LoginRequestAction implements Action {
    readonly type = ActionTypes.LOGIN_REQUEST;

    constructor(public payload: LoginData) {
    }
}

export class LoginErrorAction implements Action {
    readonly type = ActionTypes.LOGIN_ERROR;

    constructor(public payload: FormResponseError) {
    }
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: AuthData) {
    }
}

export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;

    constructor() {
    }
}

export class LoginClearAction implements Action {
    readonly type = ActionTypes.LOGIN_CLEAR;

    constructor() {
    }
}

export type ActionsUnion = LoginRequestAction
    | LoginErrorAction
    | LoginSuccessAction
    | LogoutAction
    | LoginClearAction;
