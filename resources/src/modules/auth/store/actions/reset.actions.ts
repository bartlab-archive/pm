import {Action} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {ResetData} from '../../interfaces/auth';

export enum ActionTypes {
    RESET_REQUEST = '[Auth] Reset Request',
    RESET_ERROR = '[Auth] Reset Set error',
    RESET_SUCCESS = '[Auth] Reset Success',
    RESET_CLEAR = '[Auth] Reset Clear'
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
