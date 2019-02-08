import {createSelector} from '@ngrx/store';
import {selectWikiEntities, selectWikiState} from '../reducers';
import {awaitImport, dummyFn} from '../../../../app/helpers/import';
import {denormalize} from 'normalizr';
import {wikiSchema, projectsSchema} from '../schemas';

const {selectProjectsEntities, selectProjectsMy, selectMembersEntities} = awaitImport(
    'modules/projects/store/reducers',
    {
        selectProjectsEntities: dummyFn,
        selectProjectsMy: dummyFn,
        selectMembersEntities: dummyFn,
    },
);

const {selectUsersEntities} = awaitImport('app/store/reducers/app.reducer', {selectUsersEntities: dummyFn});

export const selectWikiIds = createSelector(
    selectWikiState,
    (state) => state.ids,
);
export const selectWikiStatus = createSelector(
    selectWikiState,
    (state) => state.status,
);
export const selectWikiError = createSelector(
    selectWikiState,
    (state) => state.error,
);
export const selectWikiActiveId = createSelector(
    selectWikiState,
    (state) => state.activeId,
);
export const selectWikiMeta = createSelector(
    selectWikiState,
    (state) => state.meta,
);

const selectEntities = [selectWikiEntities, selectProjectsEntities, selectUsersEntities, selectMembersEntities];

const mapEntitiesToObject = (issues?, projects?, users?, trackers?, statuses?, priorities?, members?) => ({
    issues,
    projects,
    users,
    trackers,
    statuses,
    priorities,
    members,
});

export const selectWikiActive = createSelector(
    [selectWikiActiveId, ...selectEntities] as any,
    (activeId, ...entities) => denormalize(activeId, wikiSchema, mapEntitiesToObject(...entities)),
);

export const selectWiki = createSelector(
    [selectWikiIds, ...selectEntities] as any,
    (ids, ...entities) => denormalize(ids, [wikiSchema], mapEntitiesToObject(...entities)),
);

export const selectMyProjects = selectProjectsMy
    ? createSelector(
        [selectProjectsMy, ...selectEntities] as any,
        (my, ...entities) => denormalize(my, [projectsSchema], mapEntitiesToObject(...entities)),
    )
    : null;
