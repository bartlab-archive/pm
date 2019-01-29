// import {ActionReducer, combineReducers} from '@ngrx/store';
import {ActionsUnion, ActionTypes} from '../actions/categories.actions';
import {SharedActionTypes} from '../actions/shared.action';
import {SharedActionsUnion} from '../actions/shared.action';

export const categories = (state = [], action: ActionsUnion | SharedActionsUnion) => {
    switch (action.type) {
        case ActionTypes.ADD_CATEGORY: {
            return [
                ...state,
                action.payload
            ];
        }

        case SharedActionTypes.AUTH_LOGOUT: {
            return [];
        }

        default: {
            return state;
        }
    }
};


export interface CategoriesState {
    categories: Array<any>;
}

// export const categoriesReducer: ActionReducer<CategoriesState> = combineReducers({
//     categories,
// });
