import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';
import {selectAdminCategories} from '../../store/reducers';

@Component({
    selector: 'app-admin-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class AdminListComponent implements OnInit {

    // public categories = [
    //     {name: 'Projects', icon: 'work', url: '/admin/projects'},
    //     {name: 'Users', icon: 'person', url: '/admin/users'},
    //     {name: 'Trackers', icon: 'timelapse', url: '/admin/trackers'},
    //     {name: 'Issues statuses', icon: 'done', url: '/issue_statuses'},
    // ];
    public categories$: Observable<any> = this.store.pipe(select(selectAdminCategories));

    public constructor(
        private store: Store<any>,
    ) {
    }

    public ngOnInit(): void {
    }
}
