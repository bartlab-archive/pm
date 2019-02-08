import {Action} from '@ngrx/store';

export enum ActionTypes {
    PROJECT_MODULES_RECEIVED = '[projects] active modules received',
}
export class SharedProjectModulesReceived implements Action {
  readonly type = ActionTypes.PROJECT_MODULES_RECEIVED;

  constructor(public payload: any) {
  }
}

export type SharedActionsUnion = SharedProjectModulesReceived;
