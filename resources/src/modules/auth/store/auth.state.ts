// import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
// import {Action} from '@ngrx/store';
// import * as filmAction from '../actions/films';
// import { Film } from '../../models';
export interface State {
    action: string;
    updated_on: string;
    user: {};
    value: string;
}

export const initialState: State = {
    action: null,
    updated_on: null,
    user: {},
    value: null,
};
