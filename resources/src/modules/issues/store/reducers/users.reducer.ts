import {combineReducers} from '@ngrx/store';
import {IssuesActionsUnion, IssuesActionTypes} from '../actions/issues.action';
import {ProjectsActionsUnion, ProjectsActionTypes} from '../actions/projects.action';
import {SharedActionsUnion, SharedActionTypes} from '../actions/shared.action';
import {updateStateEntities} from '../utils/ngrx-utils';

const entities = (state = {}, action: IssuesActionsUnion | SharedActionsUnion | ProjectsActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
        case IssuesActionTypes.ITEM_SUCCESS:
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS:
            return {
                ...state,
                ...updateStateEntities(state, action.payload.entities.users)
            };

        case SharedActionTypes.AUTH_LOGOUT:
            return {};

        default:
            return state;
    }
};

const ids = (state = {}, action: IssuesActionsUnion | SharedActionsUnion | ProjectsActionsUnion) => {
    switch (action.type) {
        case IssuesActionTypes.ALL_SUCCESS:
        case IssuesActionTypes.ITEM_SUCCESS:
        case ProjectsActionTypes.MY_PROJECTS_SUCCESS:
            const users = action.payload.entities.users;
            return Object.keys(users)
                .map(p => users[p].id);

        default:
            return state;
    }
};
export const userReducers = combineReducers({
    entities,
    ids
});
