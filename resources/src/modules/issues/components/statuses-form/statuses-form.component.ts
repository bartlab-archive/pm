import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {
    selectStatusesActive,
    selectStatusesStatus,
} from '../../store/selectors/statuses';
import {RequestStatus} from '../../../../app/interfaces/api';
import {
    StatusesItemRequestAction,
    StatusesItemResetAction,
} from '../../store/actions/statuses.action';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Status} from '../../interfaces/statuses';

@Component({
    selector: 'app-issues-statuses-form',
    templateUrl: './statuses-form.component.html',
    styleUrls: ['./statuses-form.component.scss'],
})
export class IssuesStatusesFormComponent implements OnInit, OnDestroy {

    public item: Status = {
        id: Number(this.activatedRoute.snapshot.paramMap.get('id')),
        name: '',
        is_closed: false
    };

    public form = this.fb.group({
        'name': ['', Validators.required],
        'is_closed': [''],
    });

    public subscriptions: Array<Subscription> = [];
    public isNew = !Boolean(this.item.id);
    public pending = false;

    public item$ = this.store.pipe(select(selectStatusesActive), filter((item) => Boolean(item)));
    public requestStatus$ = this.store.pipe(select(selectStatusesStatus));

    public constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.requestStatus$.subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),
        );

        if (!this.isNew) {
            this.subscriptions.push(
                this.item$.subscribe((item) => {
                    const {name, is_closed} = Object.assign(this.item, item);
                    this.form.setValue({name, is_closed});
                })
            );

            this.load();
        }
    }

    public ngOnDestroy(): void {
        if (!this.isNew) {
            this.store.dispatch(new StatusesItemResetAction());
        }
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new StatusesItemRequestAction(this.item.id));
    }

    public onSubmit(): void {
        this.router.navigate(['/issue_statuses']);
    }

}
