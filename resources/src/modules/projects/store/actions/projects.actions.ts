import {Action} from '@ngrx/store';
import {ListResponse, PaginationParams, ProjectResponse} from '../../interfaces/projects';
import {ResponseError} from '../../../../app/interfaces/api';

export enum ActionTypes {
    PRELOAD_REQUEST = '[projects] preload request',
    PRELOAD_ERROR = '[projects] preload error',
    PRELOAD_SUCCESS = '[projects] preload success',
    LIST_REQUEST = '[projects] list request',
    LIST_ERROR = '[projects] list error',
    LIST_SUCCESS = '[projects] list success',
    ONE_REQUEST = '[projects] one request',
    ONE_ERROR = '[projects] one error',
    ONE_SUCCESS = '[projects] one success',
    RESET_ACTIVE_ID = '[projects] reset active id',
}

export class PreloadRequestAction implements Action {
    readonly type = ActionTypes.PRELOAD_REQUEST;

    constructor() {
    }
}

export class PreloadErrorAction implements Action {
    readonly type = ActionTypes.PRELOAD_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class PreloadSuccessAction implements Action {
    readonly type = ActionTypes.PRELOAD_SUCCESS;

    constructor(public payload: any) {
    }
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

    constructor(public payload: string) {
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

export class ResetActiveIdAction implements Action {
    readonly type = ActionTypes.RESET_ACTIVE_ID;

    constructor() {
    }
}

export type ActionsUnion =
    | ListRequestAction
    | ListErrorAction
    | ListSuccessAction
    | OneRequestAction
    | OneErrorAction
    | OneSuccessAction
    | ResetActiveIdAction
    | PreloadRequestAction
    | PreloadErrorAction
    | PreloadSuccessAction;
