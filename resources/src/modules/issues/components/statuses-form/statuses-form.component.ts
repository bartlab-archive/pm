import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {
    selectStatusesActive,
    selectStatusesStatus,
} from '../../store/selectors/statuses';
import {RequestStatus} from '../../../../app/interfaces/api';
import {
    StatusesActionTypes,
    StatusesItemRequestAction,
    StatusesItemResetAction,
    StatusesItemSaveRequestAction,
    StatusesItemSaveSuccessAction,
} from '../../store/actions/statuses.action';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Status} from '../../interfaces/statuses';
// import {StatusesEffect} from '../../store/effects/statuses.effect';
// import {ofType} from '@ngrx/effects';

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
    // public errors$ = this.store.pipe(select(selectStatusesSa))
    public requestStatus$ = this.store.pipe(select(selectStatusesStatus));

    // public saved$ = this.statusesEffect.save$.pipe(ofType(StatusesActionTypes.STATUSES_ITEM_SAVE_SUCCESS));

    public constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        // public statusesEffect: StatusesEffect
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.requestStatus$.subscribe((status) => {
                this.pending = status === RequestStatus.pending;
            }),

            // this.saved$.subscribe(() => this.router.navigate(['/issue_statuses']))
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
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        if (!this.isNew) {
            this.store.dispatch(new StatusesItemResetAction());
        }
    }

    public load(): void {
        this.store.dispatch(new StatusesItemRequestAction(this.item.id));
    }

    public onSubmit(): void {
        this.store.dispatch(new StatusesItemSaveRequestAction({
            id: this.item.id,
            name: this.form.get('name').value,
            is_closed: Boolean(this.form.get('is_closed').value),
        }));
        // this.router.navigate(['/issue_statuses']);
    }

}
