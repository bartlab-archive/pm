import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';

export enum WikiActionTypes {
    PRELOAD_REQUEST = '[wiki] preload',
    LIST_REQUEST = '[wiki] all request',
    LIST_ERROR = '[wiki] all error',
    LIST_SUCCESS = '[wiki] all success',
    ITEM_REQUEST = '[wiki] item request',
    ITEM_ERROR = '[wiki] item error',
    ITEM_SUCCESS = '[wiki] item success',
}

export class WikiListRequestAction implements Action {
    readonly type = WikiActionTypes.LIST_REQUEST;

    constructor(public payload) {
    }
}

export class WikiListErrorAction implements Action {
    readonly type = WikiActionTypes.LIST_ERROR;

    constructor(public payload) {
    }
}

export class WikiListSuccessAction implements Action {
    readonly type = WikiActionTypes.LIST_SUCCESS;

    constructor(public payload) {
    }
}

export class ItemRequestAction implements Action {
    readonly type = WikiActionTypes.ITEM_REQUEST;

    constructor(public payload: number) {
    }
}

export class ItemErrorAction implements Action {
    readonly type = WikiActionTypes.ITEM_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export class ItemSuccessAction implements Action {
    readonly type = WikiActionTypes.ITEM_SUCCESS;

    constructor(public payload: any) {
    }
}

export class WikiPreloadRequestAction implements Action {
    readonly type = WikiActionTypes.PRELOAD_REQUEST;

    constructor() {
    }
}

export type WikiActionsUnion =
    | WikiListRequestAction
    | WikiListErrorAction
    | WikiListSuccessAction
    | ItemErrorAction
    | ItemRequestAction
    | ItemSuccessAction
    | WikiPreloadRequestAction;
