import {combineReducers} from '@ngrx/store';
import {FormResponseError} from '../../../main/interfaces/api';
import {AuthData} from '../../interfaces/auth';
import * as AuthActions from '../actions/auth.actions';

export const data = (state: AuthData = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_SUCCESS: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export const error = (state: FormResponseError = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_FAILURE: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export const pending = (state: boolean = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_REQUEST: {
            return true;
        }

        case AuthActions.ActionTypes.LOGIN_SUCCESS:
        case AuthActions.ActionTypes.LOGIN_FAILURE: {
            return false;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    data: AuthData;
    error: FormResponseError;
    pending: boolean;
}

export const reducer = combineReducers({
    data,
    error,
    pending,
});

export const getData = (state: State) => state.data;
export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
