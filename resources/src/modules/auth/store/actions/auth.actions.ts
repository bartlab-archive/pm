import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../main/interfaces/api';
import {AuthData, LoginData} from '../../interfaces/auth';

export enum ActionTypes {
    LOGIN_REQUEST = '[Auth] Login Request',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGIN_SUCCESS = '[Auth] Login Success'
}

export class LoginRequestAction implements Action {
    readonly type = ActionTypes.LOGIN_REQUEST;

    constructor(public payload: LoginData) {
    }
}

export class LoginFailureAction implements Action {
    readonly type = ActionTypes.LOGIN_FAILURE;

    constructor(public payload: FormResponseError) {
    }
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: AuthData) {
    }
}

export type ActionsUnion = LoginRequestAction
    | LoginFailureAction
    | LoginSuccessAction;
