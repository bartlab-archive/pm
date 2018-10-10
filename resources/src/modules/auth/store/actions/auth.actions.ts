import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {AuthData, LoginData} from '../../interfaces/auth';

export enum ActionTypes {
    LOGIN_REQUEST = '[Auth] Login Request',
    LOGIN_ERROR = '[Auth] Login Set error',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGOUT = '[Auth] Logout',
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

export type ActionsUnion = LoginRequestAction
    | LoginErrorAction
    | LoginSuccessAction
    | LogoutAction;
