import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';

export enum ProjectsActionTypes {
    MY_PROJECTS_REQUEST = '[projects] my projects request',
    MY_PROJECTS_SUCCESS = '[projects] my projects success',
    MY_PROJECTS_ERROR = '[projects] my projects error',
}

export class MyProjectsRequestAction implements Action {
    readonly type = ProjectsActionTypes.MY_PROJECTS_REQUEST;

    constructor() {
    }
}

export class MyProjectsSuccessAction implements Action {
    readonly type = ProjectsActionTypes.MY_PROJECTS_SUCCESS;

    constructor(public payload) {
    }
}

export class MyProjectsErrorAction implements Action {
    readonly type = ProjectsActionTypes.MY_PROJECTS_ERROR;

    constructor(public payload: ResponseError) {
    }
}

export type ProjectsActionsUnion =
    | MyProjectsRequestAction
    | MyProjectsSuccessAction
    | MyProjectsErrorAction;