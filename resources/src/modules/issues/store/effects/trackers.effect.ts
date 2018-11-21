import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {TrackersService} from '../../services';
import {
    TrackersActionTypes,
    TrackersAllErrorAction,
    TrackersAllRequestAction,
    TrackersAllSuccessAction
} from '../actions/trackers.action';

@Injectable()
export class TrackersEffect {

    @Effect()
    protected trackers$ = this.actions$.pipe(
        ofType<TrackersAllRequestAction>(TrackersActionTypes.TRACKERS_ALL_REQUEST),
        map((action) => action.payload),
        exhaustMap((data) => this.trackersService.all(data).pipe(
            map((response) => new TrackersAllSuccessAction(response)),
            catchError((response) => of(new TrackersAllErrorAction(response)))
        ))
    );

    public constructor(
        protected actions$: Actions,
        protected trackersService: TrackersService
    ) {

    }
}
