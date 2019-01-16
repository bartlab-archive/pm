import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {
    FormBuilder,
    Validators
} from '@angular/forms';

import {selectIssuesActive, selectIssuesStatus} from '../../store/selectors/issues';
import {combineLatest, Subscription} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {Issue} from '../../interfaces/issues';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-issues-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})

export class IssuesFormComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public item$: Observable<Issue>;
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus));
    public params$: Observable<Params> = this.activatedRoute.params;

    public form = this.fb.group({
        'subject': ['', Validators.required],
        'description': ['', Validators.required],
        'project': ['', Validators.required],
        'tracker': ['', Validators.required],
    });

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private fb: FormBuilder,
    ) {
    }

    public ngOnInit(): void {
        this.pending$ = this.store.pipe(select(selectIssuesStatus), map(status => status === RequestStatus.pending));
        this.item$ = combineLatest(this.store.pipe(select(selectIssuesActive)), this.params$)
            .pipe(
                filter(([issue, params]) => issue && issue.id === Number(params.id)),
                map((([issue]) => issue)),
            );

        this.subscriptions.push(
            this.params$.subscribe(params => {
                if (params.id) {
                    this.load(Number(params.id))
                }
            }),
        );
    }

    public load(id): void {
        this.store.dispatch(new ItemRequestAction(id));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
