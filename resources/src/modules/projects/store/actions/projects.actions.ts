import {Action} from '@ngrx/store';
import {PaginationParams} from '../../interfaces/projects';
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
    UPDATE_REQUEST = '[projects] update request',
    UPDATE_ERROR = '[projects] update error',
    UPDATE_SUCCESS = '[projects] update success',
    UPDATE_MODULES_REQUEST = '[projects] update modules request',
    UPDATE_MODULES_ERROR = '[projects] update modules error',
    UPDATE_MODULES_SUCCESS = '[projects] update modules success',
}

export class PreloadRequestAction implements Action {
    readonly type = ActionTypes.PRELOAD_REQUEST;

    constructor() {}
}

export class PreloadErrorAction implements Action {
    readonly type = ActionTypes.PRELOAD_ERROR;

    constructor(public payload: ResponseError) {}
}

export class PreloadSuccessAction implements Action {
    readonly type = ActionTypes.PRELOAD_SUCCESS;

    constructor(public payload: any) {}
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

    constructor(public payload: any) {}
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

    constructor(public payload: any) {}
}

export class ResetActiveIdAction implements Action {
    readonly type = ActionTypes.RESET_ACTIVE_ID;

    constructor() {}
}

export class UpdateRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_REQUEST;

    constructor(public payload: any) {}
}

export class UpdateErrorAction implements Action {
    readonly type = ActionTypes.UPDATE_ERROR;

    constructor(public payload: ResponseError) {}
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: any) {}
}

export class UpdateModulesRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_MODULES_REQUEST;

    constructor(public payload: any) {}
}

export class UpdateModulesErrorAction implements Action {
    readonly type = ActionTypes.UPDATE_MODULES_ERROR;

    constructor(public payload: ResponseError) {}
}

export class UpdateModulesSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_MODULES_SUCCESS;

    constructor(public payload: any) {}
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
    | PreloadSuccessAction
    | UpdateRequestAction
    | UpdateErrorAction
    | UpdateSuccessAction
    | UpdateModulesRequestAction
    | UpdateModulesErrorAction
    | UpdateModulesSuccessAction;
