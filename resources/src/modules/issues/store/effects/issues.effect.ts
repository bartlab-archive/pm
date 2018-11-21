import {Actions, Effect, ofType} from '@ngrx/effects';
import {IssuesService} from '../../services';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    IssuesActionTypes,
    IssuesAllErrorAction,
    IssuesAllRequestAction,
    IssuesAllSuccessAction,
} from '../actions/issues.action';

@Injectable()
export class IssuesEffect {

    @Effect()
    protected issues$ = this.actions$.pipe(
        ofType<IssuesAllRequestAction>(IssuesActionTypes.ALL_REQUEST),
        map((action) => action.payload),
        exhaustMap((params) => this.issuesService.all(params).pipe(
            map((response) => new IssuesAllSuccessAction(response)),
            catchError((response) => of(new IssuesAllErrorAction(response)))
        ))
    );

    public constructor(
        protected actions$: Actions,
        protected issuesService: IssuesService
    ) {

    }
}
