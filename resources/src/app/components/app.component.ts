import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../services/app.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    public constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private appService: AppService
    ) {
    }

    public ngOnInit(): void {
        this.appService.httpError$.subscribe((error) => {
            switch (error.status) {
                // case 401: {
                //     return this.router.navigate(['/login']);
                // }
                case 404: {
                    return this.router.navigate(['/404']);
                }
                case 500: {
                    // return this.router.navigate(['/500']);
                    this.snackBar.open('Server error');
                }
            }
        });
    }

    public ngOnDestroy(): void {
    }
}
