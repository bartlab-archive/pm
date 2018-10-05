import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    count$: Observable<any>;

    public form = this.fb.group({
        'login': [],
        'password': [],
    });

    public constructor(
        private store: Store<any>,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        this.count$ = store.pipe(select('auth2'));
        console.log(this.count$);
        this.store.dispatch({type: 'test'});
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
        console.log(this.form);
        this.authService
            .login(this.form.get('login').value, this.form.get('password').value)
            .subscribe(
                (response: any) => {
                    // console.log(response);
                    this.snackBar.open(`Welcome, ${response.data.user.full_name}!`);
                    return this.router.navigate(['/index']);
                },
                (response: HttpErrorResponse) => {
                    if (response.status === 422) {
                        for (const key of Object.keys(response.error.errors)) {
                            const field = this.form.get(key);
                            if (field) {
                                field.setErrors({server: response.error.errors[key]});
                            }
                        }

                        this.snackBar.open(response.error.message);
                    }
                }
            );
    }
}
