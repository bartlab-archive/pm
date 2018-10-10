import {combineReducers} from '@ngrx/store';
import {FormResponseError} from '../../../../app/interfaces/api';
import {AuthData} from '../../interfaces/auth';
import * as AuthActions from '../actions/auth.actions';

export const data = (state: AuthData = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_SUCCESS: {
            return action.payload;
        }

        case AuthActions.ActionTypes.LOGOUT: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const error = (state: FormResponseError = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_ERROR: {
            return action.payload;
        }

        case AuthActions.ActionTypes.LOGIN_SUCCESS:
        case AuthActions.ActionTypes.LOGIN_REQUEST: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const status = (state: string = null, action: AuthActions.ActionsUnion) => {
    switch (action.type) {
        case AuthActions.ActionTypes.LOGIN_REQUEST: {
            return 'pending';
        }

        case AuthActions.ActionTypes.LOGIN_SUCCESS: {
            return 'success';
        }

        case AuthActions.ActionTypes.LOGIN_ERROR: {
            return 'error';
        }

        default: {
            return state;
        }
    }
};

export interface State {
    data: AuthData;
    error: FormResponseError;
    status: string;
}

export const reducer = combineReducers({
    data,
    error,
    status,
});

export const getData = (state: State) => state.data;
export const getError = (state: State) => state.error;
export const getStatus = (state: State) => state.status;
