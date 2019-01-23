import {combineReducers} from '@ngrx/store';
import {ProjectsActionsUnion, ProjectsActionTypes} from '../actions/projects.action';
import {SharedActionTypes, SharedActionsUnion} from '../actions/shared.action';
import {updateStateEntities} from '../utils/ngrx-utils';

const entities = (state = {}, action: ProjectsActionsUnion | SharedActionsUnion) => {
    switch (action.type) {

        case  ProjectsActionTypes.MY_PROJECTS_SUCCESS:
            return {
                ...state,
                ...updateStateEntities(state, action.payload.entities.members)
            };

        case SharedActionTypes.AUTH_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const membersReducers = combineReducers({
    entities,
});
