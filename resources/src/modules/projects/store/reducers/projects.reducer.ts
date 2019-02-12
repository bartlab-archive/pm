import {combineReducers} from '@ngrx/store';
import {RequestStatus, ResponseError} from '../../../../app/interfaces/api';
import * as ProjectsActions from '../actions/projects.actions';
import * as SharedActions from '../actions/shared.actions';
import {Entities, Meta, Project} from '../../interfaces/projects';
import {getStateEntities, updateStateEntities} from '../../../../app/store/utils';

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
        case ProjectsActions.ActionTypes.PRELOAD_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS:
        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.projects);
        }

        default: {
            return getStateEntities(state, action, 'projects');
        }
    }
};

export const ids = (state: Array<string> = [], action: ProjectsActions.ActionsUnion) => {
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

export const activeId = (state: string = null, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return action.payload.result;
        }

        case ProjectsActions.ActionTypes.RESET_ACTIVE_ID:
        case ProjectsActions.ActionTypes.LIST_REQUEST: {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const my = (state: Array<string> = [], action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.PRELOAD_SUCCESS: {
            return action.payload.result;
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

export const registeredSubModules = (state: Array<SubModule> = [], action: SharedActions.SharedActionsUnion) => {
    switch (action.type) {
        case SharedActions.ActionTypes.ADD_MODULE_ID_MAPPING: {
            return state.concat(action.payload);
        }

        default: {
            return state;
        }
    }
};

interface SubModule {
    id: string;
    name: string;
    path: string;
}
export interface State {
    meta: Meta;
    entities: Entities<Project>;
    ids: string[];
    activeId: string;
    my: string[];
    error: ResponseError;
    status: RequestStatus;
    registeredSubModules: SubModule[];
}

export const reducer = combineReducers({
    meta,
    entities,
    ids,
    activeId,
    my,
    error,
    status,
    registeredSubModules,
});
