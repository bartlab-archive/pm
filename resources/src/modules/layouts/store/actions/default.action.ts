import {Action} from '@ngrx/store';

export enum LayoutsDefaultActionTypes {
    LAYOUTS_DEFAULT_INIT = '[layouts] default init',
    LAYOUTS_DEFAULT_DESTROY = '[layouts] default destroy',
}

export class LayoutsDefaultInitAction implements Action {
    readonly type = LayoutsDefaultActionTypes.LAYOUTS_DEFAULT_INIT;

    constructor() {
    }
}

export class LayoutsDefaultDestroyAction implements Action {
    readonly type = LayoutsDefaultActionTypes.LAYOUTS_DEFAULT_DESTROY;

    constructor() {
    }
}

export type LayoutsDefaultActionsUnion = LayoutsDefaultInitAction
    | LayoutsDefaultDestroyAction;
