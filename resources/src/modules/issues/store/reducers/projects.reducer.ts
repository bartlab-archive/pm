import {combineReducers} from '@ngrx/store';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ProjectsActionsUnion, ProjectsActionTypes} from '../actions/projects.action';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../utils/ngrx-utils';
import {IssuesActionTypes, IssuesActionsUnion} from '../actions/issues.action';

const entities = (state = [], action: ProjectsActionsUnion | SharedActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS :
        case IssuesActionTypes.ITEM_SUCCESS:
        case SharedActionTypes.LIST_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.projects);
        }
        default:
            return state;
    }
};

export const my = (state: Array<number> = [], action: ProjectsActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS: {
            return action.payload.result;
        }

        case SharedActionTypes.LIST_SUCCESS: {
            const projects = action.payload.entities.projects;
            return Object.keys(projects)
                .filter(p => projects[p].is_my);
        }

        default: {
            return state;
        }
    }
};

const error = (state = null, action: ProjectsActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_ERROR:
            return null;

        default:
            return state;
    }
};

const status = (state = null, action: ProjectsActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case SharedActionTypes.LIST_SUCCESS:
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS:
            return RequestStatus.success;

        case ProjectsActionTypes.MY_PROJECTS_ERROR:
            return RequestStatus.error;

        case ProjectsActionTypes.MY_PROJECTS_REQUEST:
            return RequestStatus.pending;

        // case StatusesActionTypes.AUTH_LOGOUT:
        //     return null;

        default:
            return state;
    }
};

export const projectReducers = combineReducers({
    entities,
    my,
    status,
    error
});
