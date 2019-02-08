import {
    Component, ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
    FormBuilder, FormControl,
    Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';

import {Issue} from '../../interfaces/issues';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {EnumerationsRequestAction} from '../../store/actions/enumerations.action';

import {selectIssuesActive, selectIssuesStatus, selectMyProjects} from '../../store/selectors/issues';
import {selectStatuses} from '../../store/selectors/statuses';
import {selectPriorities} from '../../store/selectors/priorities';
import {selectTrackers} from '../../store/selectors/trackers';
import {Project} from '../../interfaces/projects';

@Component({
    selector: 'app-issues-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})

export class IssuesFormComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public item: Issue;
    public statuses$: Observable<any[]>;
    public trackers$: Observable<any[]>;
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus), map((status) => status === RequestStatus.pending));
    public params$: Observable<Params> = this.activatedRoute.params;
    public myProjects$: Observable<Project[]>;
    public priorities$: Observable<any[]>;
    public membersOfProject: any[] = [];
    public watcherTags: String[] = [];
    public projects: any[];
    public tagCtrl = new FormControl();
    public showDescription: boolean;
    public isNew = false;

    @ViewChild('watchersInput')
    public watchersInput: ElementRef<HTMLInputElement>;
    public form = this.fb.group({
        'subject': ['', Validators.required],
        'is_private': [''],
        'description': [''],
        'notes': [''],
        'project': ['', Validators.required],
        'tracker': ['', Validators.required],
        'status': ['', Validators.required],
        'priority': ['', Validators.required],
        'assigned': [''],
        'start_date': [''],
        'due_date': [''],
        'parent_id': [''],
        'estimated_hours': [''],
        'done_ratio': [''],
        'watchers': [''],
    });

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private fb: FormBuilder,
    ) {
    }

    public ngOnInit(): void {
        this.showDescription = this.isNew;

        if (selectMyProjects) {
            this.myProjects$ = this.store.pipe(select(selectMyProjects));

            this.subscriptions.push(
                this.myProjects$.subscribe((projects) => {
                    if (projects) {
                        this.projects = projects;
                    }
                }),
            );
        }
        this.trackers$ = this.store.pipe(select(selectTrackers));
        this.statuses$ = this.store.pipe(select(selectStatuses));
        this.priorities$ = this.store.pipe(select(selectPriorities));

        this.subscriptions.push(
            this.params$.subscribe((params) => {
                if (params.id) {
                    this.load(Number(params.id));
                }
            }),

            combineLatest(this.store.pipe(select(selectIssuesActive)), this.params$)
                .pipe(
                    filter(([issue, params]) => issue && issue.id === Number(params.id)),
                    map((([issue]) => {
                        if (issue.watchers) {
                            const watchers = issue.watchers;
                            Object.keys(watchers).map((key) => {
                                const tag = watchers[key].full_name;
                                if (tag && !this.watcherTags.includes(tag)) {
                                    this.watcherTags.push(tag);
                                }
                            });
                        }

                        if (issue.project && issue.project.members) {
                            this.membersOfProject = issue.project.members;
                        }
                        return issue;
                    })),
                ).subscribe((data) => {
                this.item = data;
                const {
                    subject = '',
                    description = '',
                    is_private,
                    notes = '',
                    project = '',
                    tracker = '',
                    status = '',
                    priority = '',
                    assigned = '',
                    start_date = '',
                    due_date = '',
                    parent_id = '',
                    estimated_hours = '',
                    done_ratio = '',
                    watchers = '',
                } = this.item;

                this.form.setValue({
                    subject,
                    description,
                    is_private,
                    notes,
                    project: project.identifier ? project.identifier : '',
                    tracker: tracker.id,
                    status: status.id,
                    priority: priority.id,
                    assigned: assigned && assigned.id ? assigned.id : '',
                    start_date,
                    due_date,
                    parent_id,
                    estimated_hours,
                    done_ratio,
                    watchers,
                });
            }),
        );

        this.store.dispatch(new EnumerationsRequestAction());
    }

    public load(id): void {
        this.store.dispatch(new ItemRequestAction(id));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public selected(identifier: String): void {
        Object.keys(this.projects).map((key) => {
            if (this.projects[key].identifier === identifier) {
                this.membersOfProject = this.projects[key].members;
            }
        });
    }

    public watched(event: MatAutocompleteSelectedEvent): void {
        if (event.option.viewValue && !this.watcherTags.includes(event.option.viewValue)) {
            this.watcherTags.push(event.option.viewValue);
            this.watchersInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
        }
    }

    public removeTag(tag: any): void {
        const index = this.watcherTags.indexOf(tag);
        if (index >= 0) {
            this.watcherTags.splice(index, 1);
            this.tagCtrl.setValue(null);
            this.watchersInput.nativeElement.focus();
        }
    }
}
