import {createSelector} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {selectIssuesState} from '../reducers';
import {issuesSchema} from '../schemas';
import {selectStatusesEntities} from './statuses';
import {selectTrackersEntities} from './trackers';
import {selectProjectsEntities} from './projects';
import {selectPrioritiesEntities} from './priorities';
import {selectMembersEntities} from './members';
import {selectUsersEntities} from './users';

export const selectIssuesEntities = createSelector(selectIssuesState, state => state.entities);
export const selectIssuesIds = createSelector(selectIssuesState, state => state.ids);
export const selectIssuesStatus = createSelector(selectIssuesState, state => state.status);
export const selectIssuesError = createSelector(selectIssuesState, state => state.error);
export const selectIssuesActiveId = createSelector(selectIssuesState, state => state.activeId);
export const selectIssuesMeta = createSelector(selectIssuesState, state => state.meta);

const selectEntities = [
    selectIssuesEntities,
    selectProjectsEntities,
    selectUsersEntities,
    selectTrackersEntities,
    selectStatusesEntities,
    selectPrioritiesEntities,
    selectMembersEntities,
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
