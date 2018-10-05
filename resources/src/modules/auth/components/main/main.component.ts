import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-auth-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class AuthMainComponent {

    constructor(private outlet: RouterOutlet) {
    }

    getActivePage() {
        return this.outlet.activatedRouteData.page;
    }
}
