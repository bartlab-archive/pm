import {Actions, Effect, ofType} from '@ngrx/effects';
import {IssuesService} from '../../services';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as  IssuesActions from '../actions/issues.action';
import {ResponseError} from '../../../../app/interfaces/api';

@Injectable()
export class IssuesEffect {

    @Effect()
    protected issues$ = this.actions$.pipe(
        ofType<IssuesActions.IssuesAllRequestAction>(IssuesActions.IssuesActionTypes.ALL_REQUEST),
        map((action) => action.payload),
        exhaustMap((params) => this.issuesService.all(params).pipe(
            map((response) => new IssuesActions.IssuesAllSuccessAction(response)),
            catchError((response) => of(new IssuesActions.IssuesAllErrorAction(response)))
        ))
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<IssuesActions.ItemRequestAction>(IssuesActions.IssuesActionTypes.ITEM_REQUEST),
        map(action => action.payload),
        exhaustMap((id: number) =>
            this.issuesService.one(id).pipe(
                map((response: any) => {
                    return new IssuesActions.ItemSuccessAction(response);
                }),
                catchError((response: ResponseError) => of(new IssuesActions.ItemErrorAction(response))),
            ),
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected issuesService: IssuesService
    ) {

    }
}
