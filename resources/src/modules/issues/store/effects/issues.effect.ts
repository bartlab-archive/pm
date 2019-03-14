import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from 'normalizr';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {IssuesService} from '../../services';
import {
    IssuesAllRequestAction,
    IssuesItemRequestAction,
    IssuesAllErrorAction,
    IssuesAllSuccessAction,
    IssuesItemSuccessAction,
    IssuesItemErrorAction,
    IssuesActionTypes,
    IssuesItemWatchRequestAction,
    IssuesItemWatchSuccessAction,
    IssuesItemWatchErrorAction,
    IssuesItemUnwatchRequestAction,
    IssuesItemUnwatchSuccessAction,
    IssuesItemUnwatchErrorAction,
    IssuesItemSaveRequestAction,
    IssuesItemSaveSuccessAction,
    IssuesItemSaveErrorAction,
    IssuesItemRemoveRequestAction,
    IssuesItemRemoveErrorAction,
    IssuesItemRemoveSuccessAction,
} from '../actions/issues.action';

import {ResponseError} from '../../../../app/interfaces/api';
import {issuesSchema} from '../schemas';
import {IssueResponse} from '../../interfaces/issues';
import {Router} from '@angular/router';

@Injectable()
export class IssuesEffect {
    @Effect()
    protected issues$ = this.actions$.pipe(
        ofType<IssuesAllRequestAction>(IssuesActionTypes.ISSUES_ALL_REQUEST),
        exhaustMap(({payload: params, requestId}) =>
            this.issuesService.all(params).pipe(
                map((response: any) => {
                    const payload = {
                        meta: response.meta,
                        ...normalize(response.data, [issuesSchema]),
                    };

                    return new IssuesAllSuccessAction(payload, requestId);
                }),
                catchError((response) => of(new IssuesAllErrorAction(response, requestId))),
            )),
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<IssuesItemRequestAction>(IssuesActionTypes.ISSUES_ITEM_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.issuesService.one(id).pipe(
                map((response: any) => {
                    const payload = {
                        // meta: response.meta,
                        ...normalize(response.data, issuesSchema),
                    };

                    return new IssuesItemSuccessAction(payload, requestId);
                }),
                catchError((response: ResponseError) => of(new IssuesItemErrorAction(response, requestId))),
            ),
        ),
    );

    @Effect()
    protected watch$ = this.actions$.pipe(
        ofType<IssuesItemWatchRequestAction>(IssuesActionTypes.ISSUES_ITEM_WATCH_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.issuesService.watch(id).pipe(
                map(() => {
                    return new IssuesItemWatchSuccessAction({
                        id,
                        is_watcheble: true,
                    }, requestId);
                }),
                catchError((response: ResponseError) => of(new IssuesItemUnwatchErrorAction(response, requestId))),
            ),
        ),
    );

    @Effect()
    protected unwatch$ = this.actions$.pipe(
        ofType<IssuesItemUnwatchRequestAction>(IssuesActionTypes.ISSUES_ITEM_UNWATCH_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.issuesService.unwatch(id).pipe(
                map(() => {
                    return new IssuesItemUnwatchSuccessAction({
                        id,
                        is_watcheble: false,
                    }, requestId);
                }),
                catchError((response: ResponseError) => of(new IssuesItemWatchErrorAction(response), requestId)),
            ),
        ),
    );

    @Effect()
    protected save$ = this.actions$.pipe(
        ofType<IssuesItemSaveRequestAction>(IssuesActionTypes.ISSUES_ITEM_SAVE_REQUEST),
        exhaustMap(({payload: request, requestId}) =>
            (request.id ? this.issuesService.update(request.id, request.body) : this.issuesService.create(request.body))
                .pipe(
                    map(({data}: IssueResponse) => {
                        const payload = {
                            ...normalize([data], [issuesSchema]),
                        };
                        this.router.navigateByUrl(`issues/${data.id}`);
                        return new IssuesItemSaveSuccessAction(payload, requestId);
                    }),
                    catchError((response: ResponseError) => of(new IssuesItemSaveErrorAction(response, requestId))),
                ),
        )
    );

    @Effect()
    protected remove$ = this.actions$.pipe(
        ofType<IssuesItemRemoveRequestAction>(IssuesActionTypes.ISSUES_ITEM_REMOVE_REQUEST),
        exhaustMap(({payload: id, requestId}) =>
            this.issuesService.remove(id).pipe(
                map((response) => {
                    this.router.navigateByUrl(`issues`);
                    return new IssuesItemRemoveSuccessAction(response, requestId);
                }),
                catchError((response: ResponseError) => of(new IssuesItemRemoveErrorAction(response, requestId)))
            )
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected issuesService: IssuesService,
        public router: Router,
    ) {

    }
}
