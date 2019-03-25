import {createSelector} from '@ngrx/store';
import {denormalize} from 'normalizr';

import {awaitImport, dummyFn} from '../../../../app/helpers/import';
import {
    issuesSchema,
    projectsSchema
} from '../schemas';
import {selectTrackersEntities} from './trackers';
import {selectStatusesEntities} from './statuses';
import {selectPrioritiesEntities} from './priorities';
import {selectModuleState} from './index';

const {
    selectProjectsEntities,
    selectProjectsMy,
    selectMembersEntities
} = awaitImport('modules/projects/store/reducers');
const {selectUsersEntities} = awaitImport('app/store/reducers/app.reducer');


export const selectIssuesState = createSelector(selectModuleState, (state: any) => state.issues);
export const selectIssuesEntities = createSelector(selectIssuesState, (state: any) => state.entities);

export const selectIssuesIds = createSelector(selectIssuesState, (state: any) => state.ids);
export const selectIssuesStatus = createSelector(selectIssuesState, (state: any) => state.status);
export const selectIssuesRequestId = createSelector(selectIssuesState, (state: any) => state.requestId);
export const selectIssuesError = createSelector(selectIssuesState, (state: any) => state.error);
export const selectIssuesActiveId = createSelector(selectIssuesState, (state: any) => state.activeId);
export const selectIssuesMeta = createSelector(selectIssuesState, (state: any) => state.meta);

const selectEntities = [
    selectIssuesEntities,
    selectProjectsEntities || dummyFn,
    selectUsersEntities || dummyFn,
    selectTrackersEntities,
    selectStatusesEntities,
    selectPrioritiesEntities,
    selectMembersEntities || dummyFn,
];

const mapEntitiesToObject = (issues?, projects?, users?, trackers?, statuses?, priorities?, members?) => ({
    issues,
    projects,
    users,
    trackers,
    statuses,
    priorities,
    members,
});

export const selectIssuesActive = createSelector(
    [selectIssuesActiveId, ...selectEntities] as any,
    (activeId, ...entities) => denormalize(activeId, issuesSchema, mapEntitiesToObject(...entities)),
);

export const selectIssues = createSelector(
    [selectIssuesIds, ...selectEntities] as any,
    (ids, ...entities) => denormalize(ids, [issuesSchema], mapEntitiesToObject(...entities)),
);

export const selectMyProjects = selectProjectsMy ? createSelector(
    [selectProjectsMy, ...selectEntities] as any,
    (my, ...entities) => denormalize(my, [projectsSchema], mapEntitiesToObject(...entities)),
) : null;
