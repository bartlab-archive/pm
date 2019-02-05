import {Action} from '@ngrx/store';
import {ResponseError} from '../../../../app/interfaces/api';
import {Status} from '../../interfaces/statuses';
import {v1} from 'uuid';

export enum StatusesActionTypes {
    STATUSES_ALL_REQUEST = '[statuses] all request',
    STATUSES_ALL_ERROR = '[statuses] all error',
    STATUSES_ALL_SUCCESS = '[statuses] all success',

    STATUSES_ITEM_REQUEST = '[statuses] item request',
    STATUSES_ITEM_ERROR = '[statuses] item error',
    STATUSES_ITEM_SUCCESS = '[statuses] item success',

    STATUSES_ITEM_SAVE_REQUEST = '[statuses] item save request',
    STATUSES_ITEM_SAVE_SUCCESS = '[statuses] item save success',
    STATUSES_ITEM_SAVE_ERROR = '[statuses] item save error',

    STATUSES_ITEM_REMOVE_REQUEST = '[statuses] item remove request',
    STATUSES_ITEM_REMOVE_SUCCESS = '[statuses] item remove success',
    STATUSES_ITEM_REMOVE_ERROR = '[statuses] item remove error',

    STATUSES_ITEM_RESET = '[statuses] item reset',
}

export class StatusesAllRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_REQUEST;
    readonly requestId = v1();

    constructor() {
    }
}

export class StatusesAllErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_ERROR;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class StatusesAllSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ALL_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

// export class IssuesLogoutSuccessAction implements Action {
//     readonly type = IssuesActionTypes.AUTH_LOGOUT;
//
//     constructor(public payload) {
//     }
// }

// Item
export class StatusesItemRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_REQUEST;
    readonly requestId = v1();

    constructor(public payload: number) {
    }
}

export class StatusesItemErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_ERROR;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class StatusesItemSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class StatusesItemResetAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_RESET;

    constructor() {
    }
}

// Item save
export class StatusesItemSaveRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_SAVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: Status) {
    }
}

export class StatusesItemSaveSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_SAVE_SUCCESS;

    constructor(public payload: any, public requestId?: string) {
    }
}

export class StatusesItemSaveErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_SAVE_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

// Item remove
export class StatusesItemRemoveRequestAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_REMOVE_REQUEST;
    readonly requestId = v1();

    constructor(public payload: Status) {
    }
}

export class StatusesItemRemoveSuccessAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_REMOVE_SUCCESS;

    constructor(public requestId?: string) {
    }
}

export class StatusesItemRemoveErrorAction implements Action {
    readonly type = StatusesActionTypes.STATUSES_ITEM_REMOVE_ERROR;

    constructor(public payload: ResponseError, public requestId?: string) {
    }
}

export type StatusesActionsUnion =
    | StatusesAllRequestAction
    | StatusesAllErrorAction
    | StatusesAllSuccessAction
    | StatusesItemRequestAction
    | StatusesItemErrorAction
    | StatusesItemSuccessAction
    | StatusesItemResetAction
    | StatusesItemSaveRequestAction
    | StatusesItemSaveSuccessAction
    | StatusesItemSaveErrorAction
    | StatusesItemRemoveRequestAction
    | StatusesItemRemoveSuccessAction
    | StatusesItemRemoveErrorAction;
// | IssuesLogoutSuccessAction;
