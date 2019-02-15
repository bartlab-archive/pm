import {combineReducers} from '@ngrx/store';
import {RequestStatus, ResponseError} from '../../../../app/interfaces/api';
import * as ProjectsActions from '../actions/projects.actions';
import {Entities, Meta, Project} from '../../interfaces/projects';
import {
    getStateEntities,
    updateStateEntities,
} from '../../../../app/store/utils';

export const meta = (
    state: Meta = null,
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.meta;
        }

        default: {
            return state;
        }
    }
};

export const entities = (
    state: Entities<Project> = {},
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.PRELOAD_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS:
        case ProjectsActions.ActionTypes.ONE_SUCCESS:
        case ProjectsActions.ActionTypes.UPDATE_SUCCESS:
        case ProjectsActions.ActionTypes.UPDATE_MODULES_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.projects);
        }

        default: {
            return getStateEntities(state, action, 'projects');
        }
    }
};

export const ids = (
    state: Array<string> = [],
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.PRELOAD_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return [...new Set([...state, ...action.payload.result])];
        }

        default: {
            return state;
        }
    }
};

export const activeId = (
    state: string = null,
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return action.payload.result;
        }

        case ProjectsActions.ActionTypes.RESET_ACTIVE_ID: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const my = (
    state: Array<string> = [],
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.PRELOAD_SUCCESS: {
            return action.payload.result;
        }

        default: {
            return state;
        }
    }
};
export const error = (
    state: ResponseError = null,
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.UPDATE_REQUEST:
        case ProjectsActions.ActionTypes.UPDATE_SUCCESS:
        case ProjectsActions.ActionTypes.UPDATE_MODULES_REQUEST:
        case ProjectsActions.ActionTypes.UPDATE_MODULES_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_REQUEST: {
            return null;
        }

        case ProjectsActions.ActionTypes.LIST_ERROR:
        case ProjectsActions.ActionTypes.UPDATE_ERROR:
        case ProjectsActions.ActionTypes.UPDATE_MODULES_ERROR: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export const status = (
    state: RequestStatus = null,
    action: ProjectsActions.ActionsUnion,
) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.UPDATE_REQUEST:
        case ProjectsActions.ActionTypes.ONE_REQUEST:
        case ProjectsActions.ActionTypes.LIST_REQUEST: {
            return RequestStatus.pending;
        }

        case ProjectsActions.ActionTypes.UPDATE_SUCCESS:
        case ProjectsActions.ActionTypes.ONE_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return RequestStatus.success;
        }

        case ProjectsActions.ActionTypes.UPDATE_ERROR:
        case ProjectsActions.ActionTypes.ONE_ERROR:
        case ProjectsActions.ActionTypes.LIST_ERROR: {
            return RequestStatus.error;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    meta: Meta;
    entities: Entities<Project>;
    ids: string[];
    activeId: string;
    my: string[];
    error: ResponseError;
    status: RequestStatus;
}

export const reducer = combineReducers({
    meta,
    entities,
    ids,
    activeId,
    my,
    error,
    status,
});
