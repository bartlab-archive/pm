import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    AUTH_LOGOUT = '[auth] logout',
    // ADD_CATEGORY = '[admin] add category',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {
    }
}

// export class SharedAddCategoryAction implements Action {
//     readonly type = SharedActionTypes.ADD_CATEGORY;
//
//     constructor(public payload: any) {
//     }
// }

export type SharedActionsUnion =
    | SharedAuthLogoutAction;
// | SharedAddCategoryAction;
