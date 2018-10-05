import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import {AuthService} from '../../services/auth.service';
import {AuthData, LoginData} from '../../interfaces/auth';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<AuthActions.LoginRequestAction>(AuthActions.ActionTypes.LOGIN_REQUEST),
        map((action: { payload, type }) => action.payload),
        exhaustMap((data: LoginData) => {
            return this.authService
                .login(data)
                .pipe(
                    map((auth: AuthData) => new AuthActions.LoginSuccessAction(auth)),
                    catchError((response: HttpErrorResponse) => {
                        const error = this.authService.getFormResponseError(response);
                        return of(new AuthActions.LoginFailureAction(error));
                    }),
                );
        })
    );

    constructor(
        protected actions$: Actions,
        protected authService: AuthService,
    ) {
    }
}
