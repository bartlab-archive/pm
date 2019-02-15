import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {selectAdminCategories} from '../../store/reducers';

@Component({
    selector: 'app-admin-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class AdminListComponent implements OnInit {
    public categories$: Observable<any> = this.store.pipe(
        select(selectAdminCategories),
    );

    public constructor(private store: Store<any>) {}

    public ngOnInit(): void {}
}
