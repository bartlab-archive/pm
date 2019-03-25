import {
    ActionReducerMap,
    MetaReducer,
} from '@ngrx/store';

import {issuesReducers} from './issues.reducer';
import {trackersReducers} from './trackers.reducer';
import {statusesReducers} from './statuses.reducer';
import {prioritiesReducers} from './priorities.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];
export const reducers: ActionReducerMap<any> = {
    issues: issuesReducers,
    statuses: statusesReducers,
    trackers: trackersReducers,
    priorities: prioritiesReducers,
};