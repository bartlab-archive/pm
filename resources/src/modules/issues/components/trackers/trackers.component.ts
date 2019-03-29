import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs/internal/Subscription';

import {Tracker} from '../../interfaces/trackers';
import {
    selectTrackers,
    selectTrackersRequestId,
    selectTrackersStatus
} from '../../store/selectors/trackers';
import {RequestStatus} from '../../../../app/interfaces/api';
import {
    TrackersAllRequestAction,
    TrackersItemRemoveRequestAction
} from '../../store/actions/trackers.action';
import {AppConfirmDialogComponent} from '../../../../app/components/confirm-dialog/confirm-dialog.component';
import {selectStatuses} from '../../store/selectors/statuses';
import {combineLatest} from 'rxjs/index';

@Component({
    selector: 'app-issues-trackers',
    templateUrl: './trackers.component.html',
    styleUrls: ['./trackers.component.scss'],
})
export class IssuesTrackersComponent implements OnInit, OnDestroy {

    public displayedColumns: Array<string> = ['name', 'status', 'comment', 'menu'];
    public dataSource: Array<object>;
    public pending = false;
    public subscriptions: Array<Subscription> = [];
    public items$: Observable<Tracker[]> = this.store.pipe(select(selectTrackers));
    public status$ = this.store.pipe(select(selectTrackersStatus));
    public statuses$ = this.store.pipe(select(selectStatuses));
    public statuses: any = [];
    public requestId$ = this.store.pipe(select(selectTrackersRequestId));
    public removeRequestId = null;
    public removed$ = combineLatest(this.status$, this.requestId$).pipe(
        filter(([status, requestId]) => Boolean(status) && Boolean(requestId)),
        filter(([status, requestId]) => status === RequestStatus.success && requestId === this.removeRequestId),
    );

    constructor(
        private store: Store<any>,
        public dialog: MatDialog,
    ) {
    }

    public ngOnInit() {
        this.subscriptions.push(
            this.status$.subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),

            this.items$.subscribe((items) => {
                this.dataSource = items;
            }),

            this.statuses$.subscribe((data) => {
                this.statuses = data;
            }),

            this.removed$.subscribe(() => {
                this.load();
                this.removeRequestId = null;
            }),
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new TrackersAllRequestAction);
    }

    public remove(item) {
        const dialogRef = this.dialog.open((AppConfirmDialogComponent), {
            width: '500px',
            data: {text: `Do you want to delete "${item.name}" tracker?`},
        });

        dialogRef.afterClosed()
            .pipe(
                filter((result) => Boolean(result)),
            )
            .subscribe(() => {
                const action = new TrackersItemRemoveRequestAction(item.id);
                this.removeRequestId = action.requestId;
                this.store.dispatch(action);
            });
    }
}
