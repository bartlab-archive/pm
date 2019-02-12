import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import * as userActions from '../../store/actions/users.actions';
import {selectUserActive, selectUsersPending} from '../../store/selectors/users';
import {Observable} from 'rxjs/internal/Observable';
import {User, UserUpdate} from '../../interfaces/users';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})

export class ProfileFormComponent implements OnInit {

    public user$: Observable<User>;
    public pending$: Observable<boolean>;
    public id: number;
    public hide = true;
    public hideRepeat = true;
    protected subscriptions: Array<Subscription> = [];

    public get isSubmitInactive() {
        const {invalid = null, status = ''} = this.form || {};
        return invalid || status === 'DISABLED';
    }

    public form = this.fb.group({
        login: [{value: ''}, [
            Validators.required,
            Validators.maxLength(60),
        ]],
        firstName: [{value: ''}, [
            Validators.required,
            Validators.maxLength(30),
        ]],
        lastName: [{value: ''}, [
            Validators.required,
            Validators.maxLength(30),
        ]],
        email: [{value: ''}, [
            Validators.required,
            Validators.email,
            Validators.maxLength(60),
        ]],
        admin: [{value: ''}, []],
        password: [{value: ''}],
        repeatPassword: [{value: ''}],
    });

    public validationMessages = {
        'login': [
            {type: 'required', message: 'Login is required'},
            {type: 'maxlength', message: 'Login cannot be more than 30 characters long'},
            {type: 'pattern', message: 'Your login must contain only numbers and letters'},
            {type: 'validUsername', message: 'Your username has already been taken'},
        ],
        'email': [
            {type: 'required', message: 'Email is required'},
            {type: 'email', message: 'Enter a valid email'},
        ],
        'firstName': [
            {type: 'required', message: 'First name is required'},
        ],
        'lastName': [
            {type: 'required', message: 'Last name is required'},
            {type: 'minlength', message: 'Password must be at least 5 characters long'},
        ],
    };

    public constructor(
        private router: Router,
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {
    }

    public ngOnInit() {
        const {id} = this.activatedRoute.snapshot.params;
        this.id = +id;
        this.store.dispatch(new userActions.OneRequestAction(this.id));
        this.user$ = this.store.pipe(select(selectUserActive));
        this.pending$ = this.store.pipe(select(selectUsersPending));

        this.subscriptions.push(
            this.user$.subscribe((user: User) => {
                if (user) {
                    this.form.patchValue({
                        login: user.login,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                        password: '',
                        repeatPassword: '',
                    });
                }
            }),
            this.pending$.subscribe((status) => status ? this.form.disable() : this.form.enable()),
        );

    }

    public onSubmit() {
        const controls = this.form.controls;

        if (this.form.invalid) {
            Object.keys(controls).forEach((name) => controls[name].markAsTouched());
            return;
        }
        const {firstName, lastName, login, email, password, repeatPassword} = this.form.value;

        const body: UserUpdate = {
            firstname: firstName,
            lastname: lastName,
            repeat_rassword: repeatPassword,
            password,
            login,
            email,
        };
        this.store.dispatch(new userActions.UpdateRequestAction({id: this.id, body}));
    }

}
