import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import * as RegisterActions from '../actions/register.actions';
import {FormService} from '../../../../app/services/form.service';
import {AuthService} from '../../services/auth.service';
import {AuthData, LoginData, RegisterData, RegisterResult} from '../../interfaces/auth';



@Injectable()
export class AuthEffects {
    @Effect()
    protected login$ = this.actions$.pipe(
        ofType<AuthActions.LoginRequestAction>(AuthActions.ActionTypes.LOGIN_REQUEST),
        map((action) => action.payload),
        exhaustMap((data: LoginData) => {
            return this.authService
                .login(data)
                .pipe(
                    map((auth: AuthData) => new AuthActions.LoginSuccessAction(auth)),
                    catchError((response) => of(new AuthActions.LoginErrorAction(
                        this.formService.getFormResponseError(response)
                        ))
                    )
                );
        })
    );

    @Effect()
    protected register$ = this.actions$.pipe(
        ofType<RegisterActions.RegisterRequestAction>(RegisterActions.ActionTypes.REGISTER_REQUEST),
        map((action) => {
            return action.payload;
        }),
        exhaustMap((data: RegisterData) => {
            return this.authService
                .register(data)
                .pipe(
                    map((register: RegisterResult) => {
                        return new RegisterActions.RegisterSuccessAction(register);
                    }),
                    catchError((response) => of(new RegisterActions.RegisterErrorAction(
                        this.formService.getFormResponseError(response)
                        ))
                    )
                );
        })
    );

    public constructor(
        protected actions$: Actions,
        protected authService: AuthService,
        protected formService: FormService,
    ) {
    }
}
