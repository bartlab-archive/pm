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

import {selectIssuesStatus} from '../../store/selectors/issues';
import {combineLatest, Subscription} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {MyProjectsRequestAction} from '../../store/actions/projects.action';
import {EnumerationsRequestAction} from '../../store/actions/enumerations.action';
import {Issue} from '../../interfaces/issues';

import {selectStatuses} from '../../store/selectors/statuses';
import {selectProjects} from '../../store/selectors/projects';
import {selectPriorities} from '../../store/selectors/priorities';
import {selectTrackers} from '../../store/selectors/trackers';
import {selectUsers} from '../../store/selectors/users';
import {IssuesSelectService} from '../../services';

@Component({
    selector: 'app-issues-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})

export class IssuesFormComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public item$: Observable<Issue>;
    public statuses$: Observable<any[]> = this.store.pipe(select(selectStatuses));
    public trackers$: Observable<any[]> = this.store.pipe(select(selectTrackers));
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus), map(status => status === RequestStatus.pending));
    public params$: Observable<Params> = this.activatedRoute.params;
    public projects$: Observable<any[]> = this.store.pipe(select(selectProjects));
    public priorities$: Observable<any[]> = this.store.pipe(select(selectPriorities));
    public users$: Observable<any[]> = this.store.pipe(select(selectUsers));
    public statuses = [];

    public form = this.fb.group({
        'subject': ['', Validators.required],
        // 'description': [''],
        // 'project': [''],
        // 'tracker': [''],
    });

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private fb: FormBuilder,
        public issuesSelectService: IssuesSelectService,
    ) {
    }

    public ngOnInit(): void {
        this.item$ = combineLatest(this.issuesSelectService.issue$, this.params$)
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

        this.store.dispatch(new MyProjectsRequestAction());
        this.store.dispatch(new EnumerationsRequestAction());
    }

    public load(id): void {
        this.store.dispatch(new ItemRequestAction(id));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
