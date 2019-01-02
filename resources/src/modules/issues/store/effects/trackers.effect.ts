import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from "normalizr";
import {TrackersService} from '../../services';
import {IssuesActionTypes} from '../actions/issues.action';
import {
    TrackersActionTypes,
    TrackersAllErrorAction,
    TrackersAllRequestAction,
    TrackersAllSuccessAction,
} from '../actions/trackers.action';
import * as schemas from "../schemas";

@Injectable()
export class TrackersEffect {
    @Effect()
    protected trackers$ = this.actions$.pipe(
        ofType<TrackersAllRequestAction>(TrackersActionTypes.TRACKERS_ALL_REQUEST, IssuesActionTypes.PRELOAD_REQUEST),
        map((action) => action.payload),
        exhaustMap((data) =>
            this.trackersService.all(data).pipe(
                map((response) => {
                    return new TrackersAllSuccessAction(normalize(response.data, [schemas.trackers]));
                }),
                catchError((response) => of(new TrackersAllErrorAction(response))),
            ),
        ),
    );

    public constructor(protected actions$: Actions, protected trackersService: TrackersService) {
    }
}
