import {Action} from '@ngrx/store';

export enum ActionTypes {
    LAYOUTS_SET_TOP_ITEMS = '[layout] set top items',
}

export class LayoutsSetTopItems implements Action {
    readonly type = ActionTypes.LAYOUTS_SET_TOP_ITEMS;

    constructor(public payload: any) {
    }
}

export type AuthSharedActionsUnion =
    | LayoutsSetTopItems;
