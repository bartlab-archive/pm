import {combineReducers} from '@ngrx/store';
import {ActionTypes} from '../actions/shared.action';
// import {LayoutsActionsUnion, LayoutsActionTypes} from '../actions/default.action';

// const entities = (state = null, action: LayoutsActionsUnion) => {
//     switch (action.type) {
//         case LayoutsActionTypes.LAYOUTS_DEFAULT_INIT:
//             return action.payload.data;
//
//         case SharedActionTypes.AUTH_LOGOUT:
//             return null;
//
//         default:
//             return state;
//     }
// };
//
const topTabs = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_MODULES_RECEIVED:
      return action.payload;
    default:
      return state;
  }
};

export const layoutsReducers = combineReducers({
    // entities,
    topTabs,
});
