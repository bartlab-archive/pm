import {combineReducers} from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';
import {FormResponseError} from '../../../../app/interfaces/api';
import {AuthData} from '../../interfaces/auth';

export const message = (state: string = null, action: RegisterActions.ActionsUnion) => {
    switch (action.type) {
        case RegisterActions.ActionTypes.REGISTER_SUCCESS_MESSAGE: {
            return action.payload;
        }

        case RegisterActions.ActionTypes.REGISTER_CLEAR: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const data = (state: AuthData = null, action: RegisterActions.ActionsUnion) => {
    switch (action.type) {
        case RegisterActions.ActionTypes.REGISTER_SUCCESS_AUTH: {
            return action.payload;
        }

        case RegisterActions.ActionTypes.REGISTER_CLEAR: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const error = (state: FormResponseError = null, action: RegisterActions.ActionsUnion) => {
    switch (action.type) {
        case RegisterActions.ActionTypes.REGISTER_ERROR: {
            return action.payload;
        }

        case RegisterActions.ActionTypes.REGISTER_CLEAR:
        case RegisterActions.ActionTypes.REGISTER_SUCCESS_MESSAGE:
        case RegisterActions.ActionTypes.REGISTER_SUCCESS_AUTH:
        case RegisterActions.ActionTypes.REGISTER_REQUEST: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const status = (state: string = null, action: RegisterActions.ActionsUnion) => {
    switch (action.type) {
        case RegisterActions.ActionTypes.REGISTER_REQUEST: {
            return 'pending';
        }

        case RegisterActions.ActionTypes.REGISTER_SUCCESS_MESSAGE: {
            return 'success-message';
        }

        case RegisterActions.ActionTypes.REGISTER_SUCCESS_AUTH: {
            return 'success-auth';
        }

        case RegisterActions.ActionTypes.REGISTER_ERROR: {
            return 'error';
        }

        case RegisterActions.ActionTypes.REGISTER_CLEAR: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    message: string;
    data: AuthData;
    error: FormResponseError;
    status: string;
}

export const reducer = combineReducers({
    message,
    data,
    error,
    status,
});

export const getMessage = (state: State) => state.message;
export const getData = (state: State) => state.data;
export const getError = (state: State) => state.error;
export const getStatus = (state: State) => state.status;
