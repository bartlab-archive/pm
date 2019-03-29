import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {filter} from 'rxjs/operators';

import {Tracker} from '../../interfaces/trackers';
import {
    TrackersItemRequestAction,
    TrackersItemResetAction,
    TrackersItemSaveRequestAction
} from '../../store/actions/trackers.action';
import {selectTrackersActive} from '../../store/selectors/trackers';
import {selectStatuses} from '../../store/selectors/statuses';

@Component({
    selector: 'app-issues-trackers-form',
    templateUrl: './trackers-form.component.html',
    styleUrls: ['./trackers-form.component.scss'],
})
export class IssuesTrackersFormComponent implements OnInit, OnDestroy {

    public item: Tracker = {
        id: Number(this.activatedRoute.snapshot.paramMap.get('id')),
        name: '',
        fields_bits: 0,
        default_status_id: null,
    };

    public form = this.fb.group({
        'name': ['', Validators.required],
        'default_status_id': [null, Validators.required],
        'fields_bits': [null],
    });

    public subscriptions: Array<Subscription> = [];
    public isNew = !Boolean(this.item.id);
    public pending = false;
    public requestId = null;
    public item$ = this.store.pipe(select(selectTrackersActive), filter((item) => Boolean(item)));
    public statuses$ = this.store.pipe(select(selectStatuses));

    public constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        if (!this.isNew) {
            this.subscriptions.push(
                this.item$.subscribe((item) => {
                    const {name, fields_bits, default_status_id} = item;
                    this.form.setValue({name, fields_bits, default_status_id});
                }),
            );
            this.load();
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        if (!this.isNew) {
            this.store.dispatch(new TrackersItemResetAction());
        }
    }

    public load(): void {
        this.store.dispatch(new TrackersItemRequestAction(this.item.id));
    }

    public onSubmit(): void {
        const action = new TrackersItemSaveRequestAction({
            id: this.item.id,
            name: this.form.get('name').value,
            fields_bits: 0,
            default_status_id: this.form.get('default_status_id').value,
        });
        this.requestId = action.requestId;
        this.store.dispatch(action);
        this.router.navigate(['/trackers']);
    }
}
