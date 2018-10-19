import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators
} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import * as RegisterActions from '../../store/actions/register.actions';
import * as AuthActions from '../../store/actions/auth.actions';
import {ListService} from '../../../main/services/list.service';
import {AuthService} from '../../services/auth.service';
import * as fromAuth from '../../store/reducers';
import * as fromRegister from '../../store/reducers';
import {FormResponseError, ValidatorMessage} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-auth-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public languages = ListService.languages;

    public constructor(
        private fb: FormBuilder,
        private store: Store<any>,
        private router: Router,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        this.store.dispatch(new RegisterActions.RegisterClearAction());
    }

    public form = this.fb.group({
        'login': ['', [
            Validators.required,
            Validators.maxLength(60),
            Validators.pattern(/^[a-z0-9_\-@.]*$/i)
        ]],
        'password': ['', [
            Validators.required,
            Validators.minLength(8)
        ]],
        'repeat_password': ['', [
            Validators.required,
            RegistrationComponent.checkPasswords.bind(this)
        ]],
        'firstname': ['', [
            Validators.required,
            Validators.maxLength(30)
        ]],
        'lastname': ['', [
            Validators.required,
            Validators.maxLength(30)
        ]],
        'email': ['', [
            Validators.required,
            Validators.pattern(/^.+@.+\..+$/),
            Validators.maxLength(60)
        ]],
        'hide_email': [false],
        'language': ['en']
    });

    public validation_messages = {
        'login': [
            {type: 'required', message: 'Login cannot be blank'},
            {type: 'maxlength', message: 'Login is too long (maximum is 60 characters)'},
            {type: 'pattern', message: 'Login is invalid'}
        ],
        'password': [
            {type: 'required', message: 'Password cannot be blank'},
            {type: 'minlength', message: 'Password is too short (minimum is 8 characters)'}
        ],
        'repeat_password': [
            {type: 'required', message: 'Repeat Password cannot blank'},
            {type: 'notSame', message: 'Password doesn\'t match confirmation'}
        ],
        'firstname': [
            {type: 'required', message: 'First name cannot be blank'},
            {type: 'maxlength', message: 'First name is too long (maximum is 30 characters)'}
        ],
        'lastname': [
            {type: 'required', message: 'Last name cannot be blank'},
            {type: 'maxlength', message: 'Last name is too long (maximum is 30 characters)'}
        ],
        'email': [
            {type: 'required', message: 'Email cannot be blank'},
            {type: 'pattern', message: 'Email is invalid'},
            {type: 'maxlength', message: 'Email is too long (maximum is 60 characters)'}
        ]
    };

    public static checkPasswords(control: FormControl): {[key: string]: boolean} | null {
        if (control.parent) {
            const password = control.parent.value['password'];
            const confirmation = control.value;

            return password === confirmation ? null : {notSame: true};
        }

        return null;
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.store
                .pipe(
                    select(fromRegister.selectRegisterStatus),
                    filter((status) => status === 'success-message')
                )
                .subscribe(() => {
                    const message = this.authService.getLastMessage();
                    this.snackBar.open(message);
                    return this.router.navigate(['/login']);
                }),

            this.store
                .pipe(
                    select(fromAuth.selectAuthStatus),
                    filter((status) => status === 'success')
                )
                .subscribe(() => {
                    const user = this.authService.getUser();
                    this.snackBar.open(`Welcome, ${user.full_name}!`);
                    return this.router.navigate(['/']);
                }),

            this.store
                .pipe(
                    select(fromAuth.selectRegisterError),
                    filter((error) => Boolean(error))
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
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public getErrorMessage(fieldName) {
        let error = '';
        const field: AbstractControl = this.form.get(fieldName);
        const validatorMessages = this.validation_messages[fieldName] ? this.validation_messages[fieldName] : [];

        validatorMessages.forEach((validator: ValidatorMessage) => {
            if (field.hasError(validator.type)) {
                error = validator.message;
            }
        });

        if (field.hasError('server')) {
            error = field.getError('server');
        }

        return error;
    }

    public submit() {
        const data = {
            ...this.form.value
        };
        this.store.dispatch(new RegisterActions.RegisterRequestAction(data));
    }
}
