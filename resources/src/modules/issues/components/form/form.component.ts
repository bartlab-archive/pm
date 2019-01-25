import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatOption, MatOptionSelectionChange, MatSelect} from '@angular/material';

import {
    FormBuilder,
    Validators
} from '@angular/forms';

import {selectIssuesStatus} from '../../store/selectors/issues';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription, Observable, Subject, from} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {EnumerationsRequestAction} from '../../store/actions/enumerations.action';
import {Issue} from '../../interfaces/issues';

import {selectStatuses} from '../../store/selectors/statuses';
import {selectPriorities} from '../../store/selectors/priorities';
import {selectTrackers} from '../../store/selectors/trackers';
import {IssuesSelectService} from '../../services';
import {Project} from '../../interfaces/projects';

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
    public myProjects$: Observable<Project[]> = this.issuesSelectService.myProjects$;
    public priorities$: Observable<any[]> = this.store.pipe(select(selectPriorities));
    public users = [];
    public projects = [];

    public projectSelect$: Observable<MatOption>;

    public membersSubject: Subject<any[]> = new Subject();
    public members$: Observable<any[]>;

    // public members$: Subject<any> = new Subject();
    public projectSelectSubscription: Subscription;

    @ViewChild('projectSelect')
    set projectSelect(select: MatSelect) {
        if (select) {
            if (this.projectSelectSubscription) {
                this.projectSelectSubscription.unsubscribe();
            }

            this.projectSelectSubscription = this.initSelectionPipe(select.optionSelectionChanges);
        }
    };

    @Output() search = new EventEmitter<string>();

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
        this.members$ = from(this.membersSubject);
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

        this.store.dispatch(new EnumerationsRequestAction());
    }

    public load(id): void {
        this.store.dispatch(new ItemRequestAction(id));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        if (this.projectSelectSubscription) {
            this.projectSelectSubscription.unsubscribe();
        }
    }

    public initSelectionPipe(select$: Observable<MatOptionSelectionChange>): Subscription {
        this.projectSelect$ = select$.pipe(
            filter(option => option.isUserInput),
            map(option => option.source),
        );

        const members$ = combineLatest(
            this.myProjects$,
            this.projectSelect$,
        ).pipe(
            map(([myProjects, projectSelect]) => myProjects.find(myProject => myProject.identifier === projectSelect.value)),
            filter(Boolean),
            map(myProject => myProject.members),
        );

        return members$.subscribe(this.membersSubject);
    }
}
