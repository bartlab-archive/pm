import {combineReducers} from '@ngrx/store';
import {Entities, User} from '../../interfaces/users';
import * as UsersActions from '../actions/users.actions';
import {updateStateEntities} from '../../../../app/store/utils';

export const entities = (state: Entities<User> = {}, action: UsersActions.ActionsUnion) => {
    switch (action.type) {
        case UsersActions.ActionTypes.LIST_SUCCESS: {
            console.log(action.payload);
            // return updateStateEntities(state, action.payload.entities);
            return state;

        }

        default: {
            return state;
        }
    }
};

export interface State {
    entities: Entities<any>;
}

export const reducer = combineReducers({
    entities,
});
