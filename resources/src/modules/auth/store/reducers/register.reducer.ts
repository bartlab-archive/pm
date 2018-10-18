import {combineReducers} from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';
import {FormResponseError} from '../../../../app/interfaces/api';
import {RegisterResult} from '../../interfaces/auth';

export const data = (state: RegisterResult = null, action: RegisterActions.ActionsUnion) => {
    switch (action.type) {
        case RegisterActions.ActionTypes.REGISTER_SUCCESS: {
            return action.payload;
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

        case RegisterActions.ActionTypes.REGISTER_SUCCESS:
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

        case RegisterActions.ActionTypes.REGISTER_SUCCESS: {
            return 'success';
        }

        case RegisterActions.ActionTypes.REGISTER_ERROR: {
            return 'error';
        }

        default: {
            return state;
        }
    }
};

export interface State {
    data: RegisterResult;
    error: FormResponseError;
    status: string;
}

export const reducer = combineReducers({
    data,
    error,
    status,
});

export const getData = (state: State): RegisterResult => state.data;
export const getError = (state: State): FormResponseError => state.error;
export const getStatus = (state: State): string => state.status;
