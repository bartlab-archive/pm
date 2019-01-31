import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectStatuses, selectStatusesStatus} from '../../store/selectors/statuses';
import {RequestStatus} from '../../../../app/interfaces/api';
import {StatusesAllRequestAction} from '../../store/actions/statuses.action';

@Component({
    selector: 'app-issues-statuses',
    templateUrl: './statuses.component.html',
    styleUrls: ['./statuses.component.scss'],
})
export class IssuesStatusesComponent implements OnInit, OnDestroy {

    public displayedColumns: Array<string> = ['name', 'closed', 'menu'];
    public dataSource: Array<object>;
    public subscriptions: Array<Subscription> = [];
    public pending = false;

    public constructor(
        private store: Store<any>,
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.pipe(select(selectStatusesStatus)).subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),

            this.store.pipe(select(selectStatuses)).subscribe((items) => {
                this.dataSource = items;
            })
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new StatusesAllRequestAction());
    }

}
