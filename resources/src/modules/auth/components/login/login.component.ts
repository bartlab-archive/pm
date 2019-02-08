import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as AuthActions from '../../store/actions/auth.actions';
import {filter} from 'rxjs/operators';
import * as fromAuth from '../../store/reducers';
import {FormResponseError} from '../../../../app/interfaces/api';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public form = this.fb.group({
        'login': [],
        'password': [],
    });

    public constructor(
        private store: Store<any>,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private authService: AuthService,
    ) {
        this.store.dispatch(new AuthActions.LoginClearAction());
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.store
                .pipe(
                    select(fromAuth.selectAuthStatus),
                    filter((status) => status === 'success'),
                )
                .subscribe(() => {
                    const user = this.authService.getUser();
                    this.snackBar.open(`Welcome, ${user.full_name}!`);
                    return this.router.navigate(['/']);
                }),
            // this.store.pipe(select(fromAuth.selectAuthStatus)).subscribe(() => {
            //
            // }),

            this.store
                .pipe(
                    select(fromAuth.selectAuthError),
                    filter((error) => Boolean(error)),
                )
                .subscribe((error: FormResponseError) => {
                    for (const key of Object.keys(error.errors)) {
                        const field = this.form.get(key);
                        if (field) {
                            field.setErrors({server: error.errors[key]});
                        }
                    }

                    if (error.message) {
                        this.snackBar.open(error.message);
                        this.store.dispatch(new AuthActions.LoginErrorAction(null));
                    }
                }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public getLoginErrorMessage() {
        const field = this.form.get('login');

        if (field.hasError('required')) {
            return 'Login cannot be blank';
        }

        if (field.hasError('server')) {
            return field.getError('server');
        }

        return '';
    }

    public getPasswordErrorMessage() {
        const field = this.form.get('password');

        if (field.hasError('required')) {
            return 'Password cannot be blank';
        }

        if (field.hasError('server')) {
            return field.getError('server');
        }

        return '';
    }

    public onSubmit() {
        this.store.dispatch(new AuthActions.LoginRequestAction({
            login: this.form.get('login').value,
            password: this.form.get('password').value,
        }));
    }
}
