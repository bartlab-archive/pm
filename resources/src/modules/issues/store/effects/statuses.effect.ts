import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from "normalizr";
import {StatusesService} from '../../services';
import {IssuesActionTypes} from '../actions/issues.action';
import {
    StatusesActionTypes,
    StatusesAllErrorAction,
    StatusesAllRequestAction,
    StatusesAllSuccessAction
} from '../actions/statuses.action';

import {statusesSchema} from "../schemas";

@Injectable()
export class StatusesEffect {
    @Effect()
    protected statuses$ = this.actions$.pipe(
        ofType<StatusesAllRequestAction>(StatusesActionTypes.STATUSES_ALL_REQUEST, IssuesActionTypes.PRELOAD_REQUEST),
        // map((action) => action.payload),
        exhaustMap(() =>
            this.statusesService.all().pipe(
                map((response: any) => {
                    const payload = {
                        ...normalize(response.data, [statusesSchema]),
                    };
                    return new StatusesAllSuccessAction(payload);
                }),
                catchError((response) => of(new StatusesAllErrorAction(response))),
            ),
        ),
    );

    public constructor(protected actions$: Actions, protected statusesService: StatusesService) {
    }
}
