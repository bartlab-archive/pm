import {Action} from '@ngrx/store';
import {PaginationParams, UserUpdateRequest} from '../../interfaces/users';
import {ResponseError} from '../../../../app/interfaces/api';

export enum ActionTypes {
    LIST_REQUEST = '[users] list request',
    LIST_ERROR = '[users] list error',
    LIST_SUCCESS = '[users] list success',
    ONE_REQUEST = '[users] one request',
    ONE_ERROR = '[users] one error',
    ONE_SUCCESS = '[users] one success',
    UPDATE_REQUEST = '[users] update request',
    UPDATE_SUCCESS = '[users] update success',
    UPDATE_ERROR = '[users] update error',
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

export class UpdateRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_REQUEST;

    constructor(public payload: UserUpdateRequest) {
    }
}

export class UpdateErrorAction implements Action {
    readonly type = ActionTypes.UPDATE_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: any) {
    }
}

export type ActionsUnion =
    | ListRequestAction
    | ListErrorAction
    | ListSuccessAction

    | OneRequestAction
    | OneErrorAction
    | OneSuccessAction

    | UpdateRequestAction
    | UpdateErrorAction
    | UpdateSuccessAction;
