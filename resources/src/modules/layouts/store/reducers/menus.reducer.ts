import {combineReducers} from '@ngrx/store';
import {ActionTypes, MenuActionsUnion} from '../actions/menu.action';

const tabs = (state: Tab[] = [], action: MenuActionsUnion) => {
    switch (action.type) {
        case ActionTypes.SET_TABS: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

const left = (state = [], action: MenuActionsUnion) => {
    switch (action.type) {
        case ActionTypes.SET_LEFT_ITEMS: {
            return action.payload;
        }

        case ActionTypes.ADD_LEFT_ITEM: {
            return [
                ...state,
                action.payload,
            ];
        }

        default: {
            return state;
        }
    }
};

const right = (state = [], action: MenuActionsUnion) => {
    switch (action.type) {
        case ActionTypes.SET_RIGHT_ITEMS: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

const top = (state = [], action: MenuActionsUnion) => {
    switch (action.type) {
        case ActionTypes.SET_TOP_ITEMS: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export interface MenuState {
    tabs: Tab[];
    left: Array<any>;
    right: Array<any>;
    top: Array<any>;
}

export const menusReducer = combineReducers({
    tabs,
    left,
    right,
    top,
});
