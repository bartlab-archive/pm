import {combineReducers} from '@ngrx/store';
import * as ResetActions from '../actions/reset.actions';
import {FormResponseError} from '../../../../app/interfaces/api';

export const message = (state: string = null, action: ResetActions.ActionsUnion) => {
    switch (action.type) {
        case ResetActions.ActionTypes.RESET_SUCCESS: {
            return action.payload;
        }

        case ResetActions.ActionTypes.RESET_CLEAR: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const error = (state: FormResponseError = null, action: ResetActions.ActionsUnion) => {
    switch (action.type) {
        case ResetActions.ActionTypes.RESET_ERROR: {
            return action.payload;
        }

        case ResetActions.ActionTypes.RESET_CLEAR:
        case ResetActions.ActionTypes.RESET_SUCCESS:
        case ResetActions.ActionTypes.RESET_REQUEST: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const status = (state: string = null, action: ResetActions.ActionsUnion) => {
    switch (action.type) {
        case ResetActions.ActionTypes.RESET_REQUEST: {
            return 'pending';
        }

        case ResetActions.ActionTypes.RESET_SUCCESS: {
            return 'success';
        }

        case ResetActions.ActionTypes.RESET_ERROR: {
            return 'error';
        }

        case ResetActions.ActionTypes.RESET_CLEAR: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    message: string;
    error: FormResponseError;
    status: string;
}

export const reducer = combineReducers({
    message,
    error,
    status,
});

export const getMessage = (state: State) => state.message;
export const getError = (state: State) => state.error;
export const getStatus = (state: State) => state.status;
