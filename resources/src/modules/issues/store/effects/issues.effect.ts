import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from 'normalizr';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {IssuesService} from '../../services';
import {
    IssuesAllRequestAction,
    ItemRequestAction,
    IssuesAllErrorAction,
    IssuesAllSuccessAction,
    ItemSuccessAction,
    ItemErrorAction,
    IssuesActionTypes,
    ItemWatchRequestAction,
    ItemWatchSuccessAction,
    ItemWatchErrorAction,
    ItemUnwatchRequestAction,
    ItemUnwatchSuccessAction,
    ItemUnwatchErrorAction
} from '../actions/issues.action';

import {ResponseError} from '../../../../app/interfaces/api';
import {issuesSchema} from '../schemas';

@Injectable()
export class IssuesEffect {
    @Effect()
    protected issues$ = this.actions$.pipe(
        ofType<IssuesAllRequestAction>(IssuesActionTypes.ALL_REQUEST),
        map((action) => action.payload),
        exhaustMap((params) => this.issuesService.all(params).pipe(
            map((response: any) => {
                const payload = {
                    meta: response.meta,
                    ...normalize(response.data, [issuesSchema]),
                };

                return new IssuesAllSuccessAction(payload);
            }),
            catchError((response) => of(new IssuesAllErrorAction(response)))
        ))
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<ItemRequestAction>(IssuesActionTypes.ITEM_REQUEST),
        map(action => action.payload),
        exhaustMap((id: number) =>
            this.issuesService.one(id).pipe(
                map((response: any) => {
                    const payload = {
                        // meta: response.meta,
                        ...normalize(response.data, issuesSchema),
                    };

                    return new ItemSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new ItemErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected watch$ = this.actions$.pipe(
        ofType<ItemWatchRequestAction>(IssuesActionTypes.ITEM_WATCH_REQUEST),
        map(action => action.payload),
        exhaustMap((id: number) =>
            this.issuesService.watch(id).pipe(
                map(() => {
                    return new ItemWatchSuccessAction({
                        id,
                        is_watcheble: true
                    });
                }),
                catchError((response: ResponseError) => of(new ItemUnwatchErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected unwatch$ = this.actions$.pipe(
        ofType<ItemUnwatchRequestAction>(IssuesActionTypes.ITEM_UNWATCH_REQUEST),
        map(action => action.payload),
        exhaustMap((id: number) =>
            this.issuesService.unwatch(id).pipe(
                map(() => {
                    return new ItemUnwatchSuccessAction({
                        id,
                        is_watcheble: false
                    });
                }),
                catchError((response: ResponseError) => of(new ItemWatchErrorAction(response))),
            ),
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected issuesService: IssuesService
    ) {

    }
}
