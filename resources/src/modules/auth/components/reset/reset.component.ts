import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as fromReset from '../../store/reducers';
import * as ResetActions from '../../store/actions/reset.actions';
import {FormResponseError, ValidatorMessage} from '../../../../app/interfaces/api';
import {ResetData} from '../../interfaces/auth';

@Component({
    selector: 'app-auth-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public form = this.fb.group({
        'email': ['', [
            Validators.required,
            Validators.pattern(/^.+@.+\..+$/),
            Validators.maxLength(60)
        ]]
    });

    public constructor(
        private fb: FormBuilder,
        private store: Store<any>,
        private router: Router,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        this.store.dispatch(new ResetActions.ResetClearAction());
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.store
                .pipe(
                    select(fromReset.selectResetStatus),
                    filter((status) => status === 'success')
                )
                .subscribe(() => {
                    const message = this.authService.getLastMessage();
                    this.snackBar.open(message);
                    return this.router.navigate(['/login']);
                }),

            this.store
                .pipe(
                    select(fromReset.selectResetError),
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
                        this.store.dispatch(new ResetActions.ResetErrorAction(null));
                    }
                }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public getErrorMessage() {
        let error = '';
        const field: AbstractControl = this.form.get('email');
        const validatorMessages = [
            {type: 'required', message: 'Email cannot be blank'},
            {type: 'pattern', message: 'Email is invalid'},
            {type: 'maxlength', message: 'Email is too long (maximum is 60 characters)'}
        ];

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
        const data: ResetData = {
            ...this.form.value
        };
        // todo: set fields as in login form

        this.store.dispatch(new ResetActions.ResetRequestAction(data));
    }
}
