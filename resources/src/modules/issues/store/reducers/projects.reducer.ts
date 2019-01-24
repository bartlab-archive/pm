import {combineReducers} from '@ngrx/store';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ProjectsActionsUnion, ProjectsActionTypes} from '../actions/projects.action';
import {updateStateEntities} from '../utils/ngrx-utils';
import {IssuesActionTypes, IssuesActionsUnion} from '../actions/issues.action';

const entities = (state = [], action: ProjectsActionsUnion | IssuesActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS :
        case IssuesActionTypes.ITEM_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.projects);
        }
        default:
            return state;
    }
};

export const my = (state: Array<number> = [], action: ProjectsActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS: {
            return action.payload.result;
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

const status = (state = null, action: ProjectsActionsUnion) => {
    switch (action.type) {
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS:
            return RequestStatus.success;

        case ProjectsActionTypes.MY_PROJECTS_ERROR:
            return RequestStatus.error;

        case ProjectsActionTypes.MY_PROJECTS_REQUEST:
            return RequestStatus.pending;

        default:
            return state;
    }
};

export const projectsReducers = combineReducers({
    entities,
    my,
    status,
    error
});
