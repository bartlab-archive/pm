import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {RegisterData, AuthData} from '../../interfaces/auth';

export enum ActionTypes {
    REGISTER_REQUEST = '[auth] register request',
    REGISTER_ERROR = '[auth] register set error',
    REGISTER_SUCCESS_MESSAGE = '[auth] register success message',
    REGISTER_SUCCESS_AUTH = '[auth] register success login',
    REGISTER_CLEAR = '[auth] register clear'
}

export class RegisterRequestAction implements Action {
    readonly type = ActionTypes.REGISTER_REQUEST;

    constructor(public payload: RegisterData) {
    }
}

export class RegisterErrorAction implements Action {
    readonly type = ActionTypes.REGISTER_ERROR;

    constructor(public payload: FormResponseError) {
    }
}

export class RegisterSuccessMessageAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS_MESSAGE;

    constructor(public payload: string) {
    }
}

export class RegisterSuccessAuthAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS_AUTH;

    constructor(public payload: AuthData) {
    }
}

export class RegisterClearAction implements Action {
    readonly type = ActionTypes.REGISTER_CLEAR;

    constructor() {
    }
}

export type ActionsUnion = RegisterRequestAction
    | RegisterErrorAction
    | RegisterSuccessMessageAction
    | RegisterSuccessAuthAction
    | RegisterClearAction;
