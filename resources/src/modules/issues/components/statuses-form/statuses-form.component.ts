import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription} from 'rxjs';
import {
    selectStatusesActive, selectStatusesRequestId,
    selectStatusesStatus,
} from '../../store/selectors/statuses';
import {RequestStatus} from '../../../../app/interfaces/api';
import {
    StatusesItemRequestAction,
    StatusesItemResetAction,
    StatusesItemSaveRequestAction,
} from '../../store/actions/statuses.action';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Status} from '../../interfaces/statuses';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-issues-statuses-form',
    templateUrl: './statuses-form.component.html',
    styleUrls: ['./statuses-form.component.scss'],
})
export class IssuesStatusesFormComponent implements OnInit, OnDestroy {

    public item: Status = {
        id: Number(this.activatedRoute.snapshot.paramMap.get('id')),
        name: '',
        is_closed: false,
    };

    public form = this.fb.group({
        'name': ['', Validators.required],
        'is_closed': [''],
    });

    public subscriptions: Array<Subscription> = [];
    public isNew = !Boolean(this.item.id);
    public pending = false;
    public requestId = null;
    public item$ = this.store.pipe(select(selectStatusesActive), filter((item) => Boolean(item)));
    public requestStatus$ = this.store.pipe(select(selectStatusesStatus));

    public saved$ = combineLatest(
        this.store.pipe(select(selectStatusesStatus)),
        this.store.pipe(select(selectStatusesRequestId)),
    ).pipe(
        filter(([status, requestId]) => Boolean(status) && Boolean(requestId)),
        filter(([status, requestId]) => status === RequestStatus.success && requestId === this.requestId),
    );

    public constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.requestStatus$.subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),

            this.saved$.subscribe(() => {
                this.snackBar.open(`Successful ${this.isNew ? 'creation' : 'update'}.`);
                this.router.navigate(['/issue_statuses']);
            }),

            // todo: show snakBar for error
        );

        if (!this.isNew) {
            this.subscriptions.push(
                this.item$.subscribe((item) => {
                    const {name, is_closed} = Object.assign(this.item, item);
                    this.form.setValue({name, is_closed});
                }),
            );

            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        if (!this.isNew) {
            this.store.dispatch(new StatusesItemResetAction());
        }
    }

    public load(): void {
        this.store.dispatch(new StatusesItemRequestAction(this.item.id));
    }

    public onSubmit(): void {
        const action = new StatusesItemSaveRequestAction({
            id: this.item.id,
            name: this.form.get('name').value,
            is_closed: Boolean(this.form.get('is_closed').value),
        });
        this.requestId = action.requestId;
        this.store.dispatch(action);
        // this.router.navigate(['/issue_statuses']);
    }

}
