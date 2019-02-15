import {combineReducers} from '@ngrx/store';
import {ActionTypes, SharedActionsUnion} from '../actions/shared.action';

const tabs = (state: Tab[] = [], action: SharedActionsUnion) => {
    switch (action.type) {
        case ActionTypes.SET_TABS: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export interface State {
    tabs: Tab[];
}

export const reducer = combineReducers({
    tabs,
});
