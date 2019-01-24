import {Component} from '@angular/core';

@Component({
    selector: 'app-auth-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class AuthMainComponent {

    public navLinks = [
        {path: '/login', label: 'Sign in'},
        {path: '/account/register', label: 'Register'},
        {path: '/account/lost_password', label: 'Reset'},
    ];

    public constructor() {
    }
}
