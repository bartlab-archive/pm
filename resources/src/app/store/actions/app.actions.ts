import { Action } from '@ngrx/store';

export enum ActionTypes {
    INIT = '[app] init',
}

export class InitAction implements Action {
    readonly type = ActionTypes.INIT;

    constructor() {}
}

export type ActionsUnion = InitAction;
