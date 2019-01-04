import {createSelector} from "@ngrx/store";
import {denormalize} from "normalizr";
import {
    selectUsersEntities,
    selectTrackersEntities,
    selectStatusesEntities,
    selectIssuesState
} from '../reducers';
import {issuesSchema} from "../schemas";

export const selectIssuesEntities = createSelector(selectIssuesState, state => state.entities);
export const selectIssuesIds = createSelector(selectIssuesState, state => state.ids);
export const selectIssuesStatus = createSelector(selectIssuesState, state => state.status);
export const selectIssuesError = createSelector(selectIssuesState, state => state.error);
export const selectIssuesActiveId = createSelector(selectIssuesState, state => state.activeId);
export const selectIssuesMeta = createSelector(selectIssuesState, state => state.meta);

const entities = [
    selectIssuesEntities,
    selectUsersEntities,
    selectTrackersEntities,
    selectStatusesEntities,
];
export const selectIssuesActive = createSelector(
    [...entities, selectIssuesActiveId] as any,
    (issues, users, trackers, statuses, activeId) => denormalize(activeId, issuesSchema, {
        issues,
        users,
        trackers,
        statuses
    })
);

export const selectIssues = createSelector(
    [...entities, selectIssuesIds] as any,
    (issues, users, trackers, statuses, ids) => denormalize(ids, [issuesSchema], {
        issues,
        users,
        trackers,
        statuses
    })
);
