import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';

export enum EnumerationsActionTypes {
    ENUMERATIONS_REQUEST = '[enumerations] request',
    ENUMERATIONS_ERROR = '[enumerations] error',
    ENUMERATIONS_SUCCESS = '[enumerations] success',
}

export class EnumerationsRequestAction implements Action {
    readonly type = EnumerationsActionTypes.ENUMERATIONS_REQUEST;

    constructor() {
    }
}

export class EnumerationsErrorAction implements Action {
    readonly type = EnumerationsActionTypes.ENUMERATIONS_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class EnumerationsSuccessAction implements Action {
    readonly type = EnumerationsActionTypes.ENUMERATIONS_SUCCESS;

    constructor(public payload) {
    }
}

export type EnumerationsActionsUnion = EnumerationsRequestAction
    | EnumerationsErrorAction
    | EnumerationsSuccessAction;
