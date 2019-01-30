import {Action} from '@ngrx/store';
import {ListResponse, PaginationParams} from '../../interfaces/users';
import {ResponseError} from '../../../../app/interfaces/api';

export enum ActionTypes {
    LIST_REQUEST = '[users] list request',
    LIST_ERROR = '[users] list error',
    LIST_SUCCESS = '[users] list success',
    ONE_REQUEST = '[users] one request',
    ONE_ERROR = '[users] one error',
    ONE_SUCCESS = '[users] one success',
}

export class ListRequestAction implements Action {
    readonly type = ActionTypes.LIST_REQUEST;

    constructor(public payload: PaginationParams) {
    }
}

export class ListErrorAction implements Action {
    readonly type = ActionTypes.LIST_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class ListSuccessAction implements Action {
    readonly type = ActionTypes.LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class OneRequestAction implements Action {
    readonly type = ActionTypes.ONE_REQUEST;

    constructor(public payload: number) {
    }
}

export class OneErrorAction implements Action {
    readonly type = ActionTypes.ONE_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class OneSuccessAction implements Action {
    readonly type = ActionTypes.ONE_SUCCESS;

    constructor(public payload: any) {
    }
}


export type ActionsUnion =
    | ListRequestAction
    | ListErrorAction
    | ListSuccessAction
    | OneRequestAction
    | OneErrorAction
    | OneSuccessAction;
