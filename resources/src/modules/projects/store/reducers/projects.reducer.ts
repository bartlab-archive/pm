import {combineReducers} from '@ngrx/store';
import {RequestStatus, ResponseError} from '../../../../app/interfaces/api';
import * as ProjectsActions from '../actions/projects.actions';

export const data = (state = [], action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.data;
        }

        default: {
            return state;
        }
    }
};

export const error = (state: ResponseError = null, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_ERROR: {
            return action.payload;
        }

        case ProjectsActions.ActionTypes.LIST_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_REQUEST: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const status = (state: RequestStatus = null, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_REQUEST: {
            return RequestStatus.pending;
        }

        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return RequestStatus.success;
        }

        case ProjectsActions.ActionTypes.LIST_ERROR: {
            return RequestStatus.error;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    data: any;
    error: ResponseError;
    status: RequestStatus;
}

export const reducer = combineReducers({
    data,
    error,
    status,
});

export const getData = (state: State) => state.data;
export const getError = (state: State) => state.error;
export const getStatus = (state: State) => state.status;
