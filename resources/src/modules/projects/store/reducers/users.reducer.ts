import {combineReducers} from '@ngrx/store';
import {Entities, Project} from '../../interfaces/projects';
import * as ProjectsActions from '../actions/projects.actions';
import {updateStateEntities, getStateEntities} from '../../../../app/store/utils';

export const entities = (state: Entities<Project> = {}, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.ONE_SUCCESS:
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return updateStateEntities(state, action.payload.entities.users);
        }

        default: {
            return getStateEntities(state, action, 'users');
        }
    }
};

export interface State {
    entities: Entities<any>;
}

export const reducer = combineReducers({
    entities,
});
