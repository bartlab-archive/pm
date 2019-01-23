import {combineReducers} from '@ngrx/store';
import {Entities, Meta, Project} from '../../interfaces/projects';
import * as ProjectsActions from '../actions/projects.actions';
import {updateStateEntities} from '../utils/ngrx-utils';

export const entities = (state: Entities<Project> = {}, action: ProjectsActions.ActionsUnion) => {
    switch (action.type) {
        case ProjectsActions.ActionTypes.LIST_SUCCESS: {
            return {
                ...state,
                ...updateStateEntities(state, action.payload.entities.members)
            };
        }

        case ProjectsActions.ActionTypes.ONE_SUCCESS: {
            return {
                ...state,
                ...updateStateEntities(state, action.payload.entities.members)
            };
        }

        default: {
            return state;
        }
    }
};

export interface State {
    entities: Entities<any>;
}

export const reducer = combineReducers({
    entities,
});
