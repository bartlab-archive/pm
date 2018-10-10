import {Component} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import RegistrationMatcher from './registration.matcher';
import {ListService} from '../../../main/services/list.service';

@Component({
    selector: 'app-auth-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

    public form = this.fb.group({
        'login': ['', [
            Validators.required,
            Validators.maxLength(60),
            Validators.pattern(/^[a-z0-9_\-@.]*$/i)
        ]],
        'passwords': this.fb.group({
            'password': ['', [
                Validators.required,
                Validators.minLength(8)
            ]],
            'confirmation': ['', [
                Validators.required
            ]],
        }, {validator: this.checkPasswords}),
        'first_name': ['', [
            Validators.required,
            Validators.maxLength(30),
        ]],
        'last_name': ['', [
            Validators.required,
            Validators.maxLength(30),
        ]],
        'email': ['', [
            Validators.required,
            // Validators.email,
            Validators.pattern(/^.+@.+\..+$/),
            Validators.maxLength(60),
        ]],
        'hide_email': [],
        'language': ['en'],
    });

    public languages = ListService.languages;

    public matcher = new RegistrationMatcher();

    public constructor(private fb: FormBuilder) {
    }

    public getErrorMessage() {
        return '';
    }

    public submit() {
        console.log(this.form);
    }

    public checkPasswords(group: FormGroup) {
        const password = group.controls.password.value;
        const confirmation = group.controls.confirmation.value;

        return password === confirmation ? null : {notSame: true};
    }
}

