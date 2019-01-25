import {combineReducers} from '@ngrx/store';
import {Entities, Meta, User} from '../../interfaces/users';
import * as UsersActions from '../actions/users.actions';
import {updateStateEntities} from '../../../../app/store/utils';

export const entities = (state: Entities<User> = {}, action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case UsersActions.ActionTypes.LIST_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.users);
        }

        default: {
            return state;
        }
    }
};

export const ids = (state: Array<string> = [], action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case UsersActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
    }
};

export const meta = (state: Array<string> = [], action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case UsersActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.meta;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    entities: Entities<any>;
    ids: Array<string>;
    meta: Meta;
}

export const reducer = combineReducers({
    entities,
    ids,
    meta
});
