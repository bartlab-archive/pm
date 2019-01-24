import {Action} from '@ngrx/store';

export enum LayoutsBlankActionTypes {
    LAYOUTS_BLANK_INIT = '[layouts] blank init',
    LAYOUTS_BLANK_DESTROY = '[layouts] blank destroy',
}

export class LayoutsBlankInitAction implements Action {
    readonly type = LayoutsBlankActionTypes.LAYOUTS_BLANK_INIT;

    constructor() {
    }
}

export class LayoutsBlankDestroyAction implements Action {
    readonly type = LayoutsBlankActionTypes.LAYOUTS_BLANK_DESTROY;

    constructor() {
    }
}

export type LayoutsBlankActionsUnion = LayoutsBlankInitAction
    | LayoutsBlankDestroyAction;
