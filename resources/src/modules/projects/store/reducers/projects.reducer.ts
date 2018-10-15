import { combineReducers } from '@ngrx/store';
import { RequestStatus, ResponseError } from '../../../../app/interfaces/api';
import * as ProjectsActions from '../actions/projects.actions';
import { Entities, Meta, Project } from '../../interfaces/projects';

const normalize = (data, key = 'identifier') => {
    if (Array.isArray(data)) {
        return data.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {});
    }

    return { [data[key]]: data };
};

export const meta = (state: Meta = null, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.meta;
        }

        default: {
            return state;
        }
    }
};

export const entities = (state: Entities<Project> = {}, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return {
                ...state,
                ...normalize(action.payload.data),
            };
        }

        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return {
                ...state,
                ...normalize(action.payload.data),
            };
        }

        default: {
            return state;
        }
    }
};

export const ids = (state: string[] = [], action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return action.payload.data.map((project) => project.identifier);
        }

        default: {
            return state;
        }
    }
};

export const activeId = (state: string = null, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return action.payload.data.identifier;
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
    meta: Meta;
    entities: Entities<Project>;
    ids: string[];
    activeId: string;
    error: ResponseError;
    status: RequestStatus;
}

export const reducer = combineReducers({
    meta,
    entities,
    ids,
    activeId,
    error,
    status,
});

export const getMeta = (state: State) => state.meta;
export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getActiveId = (state: State) => state.activeId;
export const getError = (state: State) => state.error;
export const getStatus = (state: State) => state.status;
