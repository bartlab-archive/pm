import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {normalize} from 'normalizr';

import {TrackersService} from '../../services';
import {IssuesActionTypes} from '../actions/issues.action';
import {trackersSchema} from '../schemas';
import {
    TrackersActionTypes,
    TrackersAllRequestAction,
    TrackersAllSuccessAction,
    TrackersAllErrorAction,

    TrackersIssueRequestAction,
    TrackersIssueSuccessAction,
    TrackersIssueErrorAction,

    TrackersItemRequestAction,
    TrackersItemSuccessAction,
    TrackersItemErrorAction,

    TrackersItemRemoveRequestAction,
    TrackersItemRemoveSuccessAction,
    TrackersItemRemoveErrorAction,
    TrackersItemSaveRequestAction,
    TrackersItemSaveSuccessAction,
    TrackersItemSaveErrorAction,
} from '../actions/trackers.action';
import {
    TrackerResponseData,
    TrackersAllResponse,
    TrackersIssueResponse
} from '../../interfaces/trackers';
import {ResponseError} from '../../../../app/interfaces/api';

@Injectable()
export class TrackersEffect {
    @Effect()
    protected trackers$ = this.actions$.pipe(
        ofType<TrackersAllRequestAction>(TrackersActionTypes.TRACKERS_ALL_REQUEST, IssuesActionTypes.ISSUES_PRELOAD_REQUEST),
        exhaustMap(() =>
            this.trackersService.all().pipe(
                map((response: TrackersAllResponse) => {
                    const payload = {
                        ...normalize(response.data, [trackersSchema]),
                    };
                    return new TrackersAllSuccessAction(payload);
                }),
                catchError((response) => of(new TrackersAllErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected issueTrackers$ = this.actions$.pipe(
        ofType<TrackersIssueRequestAction>(TrackersActionTypes.TRACKERS_ISSUE_REQUEST),
         map((action) => action.payload),
        exhaustMap(( identifier) =>
            this.trackersService.all(identifier).pipe(
                map((response: TrackersIssueResponse) => response.data),
                map((data: TrackerResponseData[]) => {
                    const payload = data.filter(({enable}) => enable).map(({tracker}) => tracker);
                    return new TrackersIssueSuccessAction(payload);
                }),
                catchError((response) => of(new TrackersIssueErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<TrackersItemRequestAction>(TrackersActionTypes.TRACKERS_ITEM_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.trackersService.one(id).pipe(
                map((response: any) => {
                    return new TrackersItemSuccessAction({
                        ...normalize(response.data, trackersSchema),
                    }, requestId);
                }),
                catchError((response: ResponseError) => of(new TrackersItemErrorAction(response, requestId))),
            ),
        ),
    );

    @Effect()
    public remove$ = this.actions$.pipe(
        ofType<TrackersItemRemoveRequestAction>(TrackersActionTypes.TRACKERS_ITEM_REMOVE_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.trackersService.remove(id)
                .pipe(
                    map(() => new TrackersItemRemoveSuccessAction(requestId)),
                    catchError((response: ResponseError) => of(new TrackersItemRemoveErrorAction(response, requestId))),
                ),
        ),
    );

    @Effect()
    public save$ = this.actions$.pipe(
        ofType<TrackersItemSaveRequestAction>(TrackersActionTypes.TRACKERS_ITEM_SAVE_REQUEST),
        exhaustMap(({payload: data, requestId}) =>
            (data.id ? this.trackersService.update(data.id, data) : this.trackersService.create(data))
                .pipe(
                    map((item) => new TrackersItemSaveSuccessAction(item, requestId)),
                    catchError((response: ResponseError) => of(new TrackersItemSaveErrorAction(response, requestId))),
                )
        ),
    );

    public constructor(protected actions$: Actions, protected trackersService: TrackersService) {
    }
}
