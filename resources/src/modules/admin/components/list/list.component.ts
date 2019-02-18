import {Component, Inject, OnInit} from '@angular/core';
import {APP_MODULE_ADMIN} from '../../../../app/providers/app.injection';

@Component({
    selector: 'app-admin-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class AdminListComponent implements OnInit {

    public constructor(
        @Inject(APP_MODULE_ADMIN) private categories,
    ) {
    }

    public ngOnInit(): void {
    }
}
