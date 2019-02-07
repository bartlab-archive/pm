import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {ResetData} from '../../interfaces/auth';

export enum ActionTypes {
    RESET_REQUEST = '[auth] reset request',
    RESET_ERROR = '[auth] reset set error',
    RESET_SUCCESS = '[auth] reset success',
    RESET_CLEAR = '[auth] reset clear',
}

export class ResetRequestAction implements Action {
    readonly type = ActionTypes.RESET_REQUEST;

    constructor(public payload: ResetData) {
    }
}

export class ResetErrorAction implements Action {
    readonly type = ActionTypes.RESET_ERROR;

    constructor(public payload: FormResponseError) {
    }
}

export class ResetSuccessAction implements Action {
    readonly type = ActionTypes.RESET_SUCCESS;

    constructor(public payload: string) {
    }
}

export class ResetClearAction implements Action {
    readonly type = ActionTypes.RESET_CLEAR;

    constructor() {
    }
}

export type ActionsUnion = ResetRequestAction
    | ResetErrorAction
    | ResetSuccessAction
    | ResetClearAction;
