import { Action } from '@ngrx/store';
// import { MyModel } from '../../models';

export enum ActionTypes {
    LOAD_REQUEST = '[Auth] Load Request',
    LOAD_FAILURE = '[Auth] Load Failure',
    LOAD_SUCCESS = '[Auth] Load Success'
}

export class LoadRequestAction implements Action {
    readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
    readonly type = ActionTypes.LOAD_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: { items: any }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;