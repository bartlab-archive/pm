import {Action} from '@ngrx/store';

export enum SharedActionTypes {
    // shared
    AUTH_LOGOUT = '[auth] logout',
    // AUTH_LOGOUT = '[auth] logout',
    ADD_CATEGORY = '[admin] add category',
    ADD_MODULE_ID_MAPPING = '[module] add module id mapping',
}

export class SharedAuthLogoutAction implements Action {
    readonly type = SharedActionTypes.AUTH_LOGOUT;

    constructor(public payload: any) {
    }
}

export class SharedAddCategoryAction implements Action {
    readonly type = SharedActionTypes.ADD_CATEGORY;

    constructor(public payload: any) {
    }
}

export class SharedAddModuleIdMappingAction implements Action {
    readonly type = SharedActionTypes.ADD_MODULE_ID_MAPPING;

    constructor(public payload: any) {
    }
}

export type SharedActionsUnion =
    | SharedAuthLogoutAction
    | SharedAddCategoryAction
    | SharedAddModuleIdMappingAction;

