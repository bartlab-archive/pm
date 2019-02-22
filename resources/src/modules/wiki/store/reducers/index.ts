import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {wikiReducers} from './wiki.reducer';

export const metaReducers: Array<MetaReducer<any, any>> = [
    // localStorageSyncReducer
];

export const reducers: ActionReducerMap<any> = {
    wiki: wikiReducers,
};

export const selectModuleSate = createFeatureSelector('moduleWiki');
export const selectWikiState = createSelector(
    selectModuleSate,
    (state: any) => state.wiki,
);

export const selectWikiEntities = createSelector(
    selectWikiState,
    (state: any) => state.entities,
);
