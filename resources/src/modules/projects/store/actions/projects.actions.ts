import {Action} from '@ngrx/store';
import {ListResponse, PaginationParams} from '../../interfaces/projects';
import {ResponseError} from '../../../../app/interfaces/api';

export enum ActionTypes {
    LIST_REQUEST = '[Projects] List Request',
    LIST_ERROR = '[Projects] List Error',
    LIST_SUCCESS = '[Projects] List Success',
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

    constructor(public payload: ListResponse) {
    }
}

export type ActionsUnion = ListRequestAction
    | ListErrorAction
    | ListSuccessAction ;
