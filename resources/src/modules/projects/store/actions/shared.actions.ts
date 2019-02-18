import {Action} from '@ngrx/store';

export enum ActionTypes {
    SET_TABS = '[layout] set tabs',
}

export class SetTabs implements Action {
    readonly type = ActionTypes.SET_TABS;

    constructor(public payload: Tab[] = []) {
    }
}

export type SharedActionsUnion =
    | SetTabs;
