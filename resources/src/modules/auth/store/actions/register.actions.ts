import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {RegisterData, RegisterResult} from '../../interfaces/auth';

export enum ActionTypes {
    REGISTER_REQUEST = '[Auth] Register Request',
    REGISTER_ERROR = '[Auth] Register Set error',
    REGISTER_SUCCESS = '[Auth] Register Success'
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

export class RegisterSuccessAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS;

    constructor(public payload: RegisterResult) {
    }
}

export type ActionsUnion = RegisterRequestAction
    | RegisterErrorAction
    | RegisterSuccessAction;
