import {Action} from '@ngrx/store';

export enum ActionTypes {
    SET_TABS = '[layout] set tabs',
    SET_RIGHT_ITEMS = '[layout] set right items',
    ADD_LEFT_ITEM = '[layout] add left item',
}

export class SetTabs implements Action {
    readonly type = ActionTypes.SET_TABS;

    constructor(public payload: Tab[] = []) {
    }
}

export class SetRightItems implements Action {
    readonly type = ActionTypes.SET_RIGHT_ITEMS;

    constructor(public payload: any) {
    }
}

export class AddLeftItem implements Action {
    readonly type = ActionTypes.ADD_LEFT_ITEM;

    constructor(public payload: any) {
    }
}

export type SharedActionsUnion =
    | SetTabs
    | SetRightItems
    | AddLeftItem;
