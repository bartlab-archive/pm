import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    template: '',
})
export class LogoutComponent {

    public constructor(
        private authService: AuthService,
    ) {
        this.authService.onUnauthorizedError(null);
    }

}
