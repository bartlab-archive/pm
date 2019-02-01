import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from 'normalizr';
import {StatusesService} from '../../services';
import {
    IssuesActionTypes,
} from '../actions/issues.action';
import {
    StatusesActionTypes,
    StatusesAllErrorAction,
    StatusesAllRequestAction,
    StatusesAllSuccessAction,
    StatusesItemErrorAction,
    StatusesItemRequestAction,
    StatusesItemSuccessAction
} from '../actions/statuses.action';

import {statusesSchema} from '../schemas';
import {ResponseError} from '../../../../app/interfaces/api';

@Injectable()
export class StatusesEffect {
    @Effect()
    protected statuses$ = this.actions$.pipe(
        ofType<StatusesAllRequestAction>(StatusesActionTypes.STATUSES_ALL_REQUEST, IssuesActionTypes.PRELOAD_REQUEST),
        // map((action) => action.payload),
        exhaustMap(() =>
            this.statusesService.all().pipe(
                map((response: any) => {
                    return new StatusesAllSuccessAction({
                        ...normalize(response.data, [statusesSchema]),
                    });
                }),
                catchError((response) => of(new StatusesAllErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<StatusesItemRequestAction>(StatusesActionTypes.STATUSES_ITEM_REQUEST),
        map(action => action.payload),
        exhaustMap((id: number) =>
            this.statusesService.one(id).pipe(
                map((response: any) => {
                    return new StatusesItemSuccessAction({
                        ...normalize(response.data, statusesSchema),
                    });
                }),
                catchError((response: ResponseError) => of(new StatusesItemErrorAction(response))),
            ),
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected statusesService: StatusesService
    ) {
    }
}
