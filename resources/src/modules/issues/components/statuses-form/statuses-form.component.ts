import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {selectStatuses, selectStatusesActive, selectStatusesStatus} from '../../store/selectors/statuses';
import {RequestStatus} from '../../../../app/interfaces/api';
import {StatusesAllRequestAction, StatusesItemRequestAction} from '../../store/actions/statuses.action';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Issue} from '../../interfaces/issues';

@Component({
    selector: 'app-issues-statuses-form',
    templateUrl: './statuses-form.component.html',
    styleUrls: ['./statuses-form.component.scss'],
})
export class IssuesStatusesFormComponent implements OnInit, OnDestroy {

    public subscriptions: Array<Subscription> = [];
    public pending = false;
    public statusId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    public isNew = !Boolean(this.statusId);
    public item = {};

    public form = this.fb.group({
        'name': ['', Validators.required],
        'is_closed': [''],
    });

    public constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.pipe(select(selectStatusesStatus)).subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),
        );

        if (!this.isNew) {
            this.subscriptions.push(
                this.store.pipe(
                    select(selectStatusesActive),
                    filter((item) => Boolean(item))
                ).subscribe((item) => {
                    this.item = item;
                    const {name, is_closed} = item;
                    this.form.setValue({name, is_closed});
                })
            );

            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new StatusesItemRequestAction(this.statusId));
    }

    public onSubmit(): void {
        this.router.navigate(['/issue_statuses']);
    }

}
