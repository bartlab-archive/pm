import {createSelector} from "@ngrx/store";
import {denormalize} from "normalizr";
import * as fromRoot from '../reducers';
import * as fromIssues from "../reducers/issues.reducer";
import * as schemas from "../schemas";

const entities = [
    fromRoot.selectIssuesEntities,
    fromRoot.selectUsersEntities,
    fromRoot.selectTrackersEntities,
    fromRoot.selectStatusesEntities,
];

export const selectIssuesStatus = createSelector(fromRoot.selectIssuesState, fromIssues.selectStatus);
export const selectIssuesError = createSelector(fromRoot.selectIssuesState, fromIssues.selectError);
export const selectIssuesMeta = createSelector(fromRoot.selectIssuesState, fromIssues.selectMeta);
export const selectIssuesIds = createSelector(fromRoot.selectIssuesState, fromIssues.selectIds);
export const selectIssuesActiveId = createSelector(fromRoot.selectIssuesState, fromIssues.selectActiveId);

export const selectIssuesActive = createSelector(
    [...entities, selectIssuesActiveId] as any,
    (issues, users, trackers, statuses, activeId) => denormalize(activeId, schemas.issues, {
        issues,
        users,
        trackers,
        statuses
    })
);

export const selectIssues = createSelector(
    [...entities, selectIssuesIds] as any,
    (issues, users, trackers, statuses, ids) => {

        return denormalize(ids, [schemas.issues], {
            issues,
            users,
            trackers,
            statuses
        });
    }
);
