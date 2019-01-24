import {combineReducers} from '@ngrx/store';
import {getStateEntities} from '../utils';

export const entities = (state, action) => {
    switch (action.type) {
        default: {
            return getStateEntities(state, action, 'roles');
        }
    }
};

export interface State {
    entities: any;
}

export const reducer = combineReducers({
    entities,
});
