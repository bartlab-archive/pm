import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    // shared
    AUTH_LOGOUT = '[auth] logout',
    // AUTH_LOGOUT = '[auth] logout',
    // ADD_CATEGORY = '[admin] add category',
    LAYOUTS_ADD_LEFT_ITEM = '[layout] add left item',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {}
}

// export class SharedAddCategoryAction implements Action {
//     readonly type = SharedActionTypes.ADD_CATEGORY;
//
//     constructor(public payload: any) {}
// }

export class SharedLayoutsAddLeftItem implements Action {
    readonly type = SharedActionTypes.LAYOUTS_ADD_LEFT_ITEM;

    constructor(public payload: any) {
    }
}

export type SharedActionsUnion =
    | SharedAuthLogoutAction
    | SharedLayoutsAddLeftItem;
    // | SharedAddCategoryAction;
