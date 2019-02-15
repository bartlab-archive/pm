import {Action} from '@ngrx/store';

export enum ActionTypes {
    ADD_CATEGORY = '[admin] add category',
    SET_TABS = '[layout] set tabs',
}

export class AddCategoryAction implements Action {
    readonly type = ActionTypes.ADD_CATEGORY;

    constructor(public payload: any) {}
}

export class SetTabs implements Action {
    readonly type = ActionTypes.SET_TABS;

    constructor(public payload: Tab[] = []) {}
}

export type SharedActionsUnion = AddCategoryAction | SetTabs;
