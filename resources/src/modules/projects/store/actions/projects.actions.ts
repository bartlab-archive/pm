import { Action } from '@ngrx/store';
import { ListResponse, PaginationParams, ProjectResponse } from '../../interfaces/projects';
import { ResponseError } from '../../../../app/interfaces/api';

export enum ActionTypes {
    LIST_REQUEST = '[Projects] List Request',
    LIST_ERROR = '[Projects] List Error',
    LIST_SUCCESS = '[Projects] List Success',
    ONE_REQUEST = '[Projects] One Request',
    ONE_ERROR = '[Projects] One Error',
    ONE_SUCCESS = '[Projects] One Success',
}

export class ListRequestAction implements Action {
    readonly type = ActionTypes.LIST_REQUEST;

    constructor(public payload: PaginationParams) {}
}

export class ListErrorAction implements Action {
    readonly type = ActionTypes.LIST_ERROR;

    constructor(public payload: ResponseError) {}
}

export class ListSuccessAction implements Action {
    readonly type = ActionTypes.LIST_SUCCESS;

    constructor(public payload: ListResponse) {}
}

export class OneRequestAction implements Action {
    readonly type = ActionTypes.ONE_REQUEST;

    constructor(public payload: string) {}
}

export class OneErrorAction implements Action {
    readonly type = ActionTypes.ONE_ERROR;

    constructor(public payload: ResponseError) {}
}

export class OneSuccessAction implements Action {
    readonly type = ActionTypes.ONE_SUCCESS;

    constructor(public payload: ProjectResponse) {}
}

export type ActionsUnion =
    | ListRequestAction
    | ListErrorAction
    | ListSuccessAction
    | OneRequestAction
    | OneErrorAction
    | OneSuccessAction;
