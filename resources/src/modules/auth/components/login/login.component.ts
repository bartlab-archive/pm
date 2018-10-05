import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as AuthActions from '../../store/actions/auth.actions';
import {LoginData} from '../../interfaces/auth';
import {AuthSelectService} from '../../services/auth-select.service';
import {FormResponseError} from "../../../main/interfaces/api";
import {filter} from "rxjs/operators";
import {AuthStorageService} from "../../services/auth-storage.service";

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public pending$: Observable<boolean> = this.authSelectService.pending$;
    public success$: Observable<boolean> = this.authSelectService.success$;
    public error$: Observable<FormResponseError> = this.authSelectService.error$;
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
        private authSelectService: AuthSelectService,
        private authStorageService: AuthStorageService,
    ) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.success$.subscribe(() => {
                const user = this.authStorageService.getUser();
                this.snackBar.open(`Welcome, ${user.full_name}!`);
                return this.router.navigate(['/index']);
            }),

            this.error$
                .pipe(filter(error => Boolean(error)))
                .subscribe((error) => {
                    for (const key of Object.keys(error.errors)) {
                        const field = this.form.get(key);
                        if (field) {
                            field.setErrors({server: error.errors[key]});
                        }
                    }

                    this.snackBar.open(error.message);
                }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

    public getFormData(): LoginData {
        return {
            login: this.form.get('login').value,
            password: this.form.get('password').value,
        };
    }

    public onSubmit() {
        this.store.dispatch(new AuthActions.LoginRequestAction(this.getFormData()));
    }
}
