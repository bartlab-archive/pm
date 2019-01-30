import {createSelector} from '@ngrx/store';
import {
    selectIssuesEntities,
    selectIssuesState,
    selectPrioritiesEntities,
    selectStatusesEntities,
    selectTrackersEntities,
} from '../reducers';
import {awaitImport, dummyFn} from '../../../../app/helpers/import';
import {denormalize} from 'normalizr';
import {issuesSchema, projectsSchema} from '../schemas';

const {selectProjectsEntities, selectProjectsMy, selectMembersEntities} = awaitImport('modules/projects/store/reducers');
const {selectUsersEntities} = awaitImport('app/store/reducers/app.reducer');

export const selectIssuesIds = createSelector(selectIssuesState, state => state.ids);
export const selectIssuesStatus = createSelector(selectIssuesState, state => state.status);
export const selectIssuesError = createSelector(selectIssuesState, state => state.error);
export const selectIssuesActiveId = createSelector(selectIssuesState, state => state.activeId);
export const selectIssuesMeta = createSelector(selectIssuesState, state => state.meta);

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
    (activeId, ...entities) => denormalize(activeId, issuesSchema, mapEntitiesToObject(...entities))
);

export const selectIssues = createSelector(
    [selectIssuesIds, ...selectEntities] as any,
    (ids, ...entities) => denormalize(ids, [issuesSchema], mapEntitiesToObject(...entities))
);

export const selectMyProjects = selectProjectsMy ? createSelector(
    [selectProjectsMy, ...selectEntities] as any,
    (my, ...entities) => denormalize(my, [projectsSchema], mapEntitiesToObject(...entities))
) : null;
