import {Action} from '@ngrx/store';

export enum ActionTypes {
    ADD_CATEGORY = '[admin] add category',
    PROJECT_MODULES_RECEIVED = '[projects] active modules received',
    ADD_MODULE_ID_MAPPING = '[module] add module id mapping',
}

export class AddCategoryAction implements Action {
    readonly type = ActionTypes.ADD_CATEGORY;

    constructor(public payload: any) {
    }
}

export class SharedProjectModulesReceived implements Action {
    readonly type = ActionTypes.PROJECT_MODULES_RECEIVED;

    constructor(public payload: any) {
    }
}

export class  SharedAddModuleIdMappingAction implements Action {
    readonly type = ActionTypes.ADD_MODULE_ID_MAPPING;

    constructor(public payload: any) {
    }
}

export type SharedActionsUnion = AddCategoryAction | SharedProjectModulesReceived | SharedAddModuleIdMappingAction;

