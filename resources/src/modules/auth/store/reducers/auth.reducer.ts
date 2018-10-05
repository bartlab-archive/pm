import { Action } from '@ngrx/store';
import {initialState, State} from '../auth.state';
// const initialState = 0;

export function authReducer(state: State = initialState, action: Action) {
    // switch (action.type) {
        // case INCREMENT:
        //     return state + 1;
        //
        // case DECREMENT:
        //     return state - 1;
        //
        // case RESET:
        //     return 0;

        // default:
            return state;
    // }
}
