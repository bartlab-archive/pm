import {combineReducers} from '@ngrx/store';
import {Entities, Meta, User} from '../../interfaces/users';
import * as UsersActions from '../actions/users.actions';
import {updateStateEntities} from '../../../../app/store/utils';
import {ActionTypes} from '../actions/users.actions';

export const entities = (state: Entities<User> = {}, action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case ActionTypes.ONE_SUCCESS:
        case ActionTypes.UPDATE_SUCCESS:
        case ActionTypes.LIST_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.users);
        }

        default: {
            return state;
        }
    }
};

export const ids = (state: Array<number> = [], action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case ActionTypes.LIST_SUCCESS: {
            return action.payload.result;
        }

        case ActionTypes.UPDATE_SUCCESS:
        case ActionTypes.ONE_SUCCESS: {
            return [...new Set([...state, ...action.payload.result])];
        }

        default: {
            return state;
        }
    }
};

export const meta = (state: Array<string> = [], action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case ActionTypes.LIST_SUCCESS: {
            return action.payload.meta;
        }

        default: {
            return state;
        }
    }
};

export const activeId = (state: number = null, action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case ActionTypes.ONE_REQUEST: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export const pending = (state: boolean = false, action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case ActionTypes.ONE_REQUEST:
        case ActionTypes.LIST_REQUEST:
        case ActionTypes.UPDATE_REQUEST:
            return true;

        case ActionTypes.LIST_SUCCESS:
        case ActionTypes.ONE_SUCCESS:
        case ActionTypes.UPDATE_SUCCESS:
        case ActionTypes.UPDATE_ERROR:
            return false;

        default: {
            return state;
        }
    }
};

export interface State {
    entities: Entities<any>;
    ids: Array<number>;
    meta: Meta;
    activeId: number;
    pending: boolean;
}

export const reducer = combineReducers({
    entities,
    ids,
    meta,
    activeId,
    pending,
});
