import {Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, Validators,} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
    MatAutocompleteSelectedEvent,
    MatSelectChange,
    MatSnackBar
} from '@angular/material';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

import {FilterTag, Issue, IssueUpdate, Priority} from '../../interfaces/issues';
import {RequestStatus} from '../../../../app/interfaces/api';
import {IssuesItemRequestAction, IssuesItemSaveRequestAction} from '../../store/actions/issues.action';
import {EnumerationsRequestAction} from '../../store/actions/enumerations.action';

import {
    selectIssuesActive,
    selectIssuesRequestId,
    selectIssuesStatus,
    selectMyProjects
} from '../../store/selectors/issues';
import {selectStatuses} from '../../store/selectors/statuses';
import {selectPriorities} from '../../store/selectors/priorities';
import {selectTrackers} from '../../store/selectors/trackers';
import {Project} from '../../interfaces/projects';
import * as moment from 'moment';
import {Status} from '../../interfaces/statuses';
import {TrackersIssueRequestAction} from '../../store/actions/trackers.action';
import {Tracker} from '../../interfaces/trackers';

@Component({
    selector: 'app-issues-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class IssuesFormComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public item: Issue;
    public id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    public identifier: string = this.activatedRoute.snapshot.paramMap.get('identifier');
    public projects$: Observable<Project[]> = this.store.pipe(select(selectMyProjects));
    public statuses$: Observable<Status[]> = this.store.pipe(select(selectStatuses));
    public trackers$: Observable<Tracker[]> = this.store.pipe(select(selectTrackers));
    public priorities$: Observable<Priority[]> = this.store.pipe(select(selectPriorities));
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectIssuesStatus),
        map((status) => status === RequestStatus.pending),
    );

    public params$ = this.activatedRoute.params;
    public showDescription: boolean = true;
    public isNew = !Boolean(this.id) || this.isNewIssue();
    public requestId = null;
    public saved$ = combineLatest(this.store.pipe(select(selectIssuesStatus)), this.store.pipe(select(selectIssuesRequestId))).pipe(
        filter(([status, requestId]) => Boolean(status) && Boolean(requestId)),
        filter(([status, requestId]) => status === RequestStatus.success && requestId === this.requestId),
    );

    @ViewChild('tagInput')
    public tagInput: ElementRef<HTMLInputElement>;
    public allTags: Array<FilterTag> = [];
    public tags: Array<FilterTag> = [];
    public tagCtrl = new FormControl();
    public separatorKeysCodes: Array<number> = [ENTER, COMMA];
    public filteredTags: Observable<Array<FilterTag>>;

    public form = this.fb.group({
        'subject': ['', Validators.required],
        'is_private': [false],
        'private_notes': [false],
        'description': [''],
        'notes': [''],
        'project': [this.identifier ? this.identifier : '', Validators.required],
        'tracker': ['', Validators.required],
        'status': ['', Validators.required],
        'priority': ['', Validators.required],
        'assigned': [''],
        'start_date': [''],
        'due_date': [''],
        'parent_id': [''],
        'estimated_hours': [''],
        'done_ratio': [0],
        'watchers': [''],
    });

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
    ) {
    }

    public ngOnInit(): void {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string) => this.filter(label)),
        );

        if (this.identifier) {
            this.subscriptions.push(
                this.projects$.subscribe(projects => {
                    this.selectProject(projects, this.identifier);
                })
            );
        }

        if (!this.isNew) {
            this.subscriptions.push(
                combineLatest(this.store.pipe(select(selectIssuesActive)), this.params$)
                    .pipe(
                        filter(([issue, params]) => issue && issue.id === Number(params.id)),
                        map((([issue]) => issue)),
                    ).subscribe((data: Issue) => {
                    if (data && data.project && data.project.members && data.watchers) {
                        this.tags = [];
                        this.allTags = data.project.members.map((member) => {
                            const tag = {name: member.user.full_name, id: member.user.id};
                            if (data.watchers.some((watcher) => watcher.id === tag.id)) {
                                this.tags.push(tag);
                            }
                            return tag;
                        });
                    }
                    this.item = data;
                    this.form.setValue({
                        subject: data.subject,
                        private_notes: false,
                        notes: '',
                        description: data.description,
                        is_private: data.is_private,
                        project: data.project.identifier,
                        tracker: (data.tracker && data.tracker.id) ? data.tracker.id : '',
                        status: (data.status && data.status.id) ? data.status.id : '',
                        priority: data.priority.id,
                        assigned: data.assigned.id ? data.assigned.id : '',
                        start_date: data.start_date,
                        due_date: data.due_date,
                        parent_id: data.parent_id,
                        estimated_hours: data.estimated_hours,
                        done_ratio: data.done_ratio,
                        watchers: data.watchers,
                    });

                    this.tagInput.nativeElement.value = '';
                    this.tagCtrl.setValue(null);
                }),
            );
            this.load();
            this.showDescription = this.isNew;
        }

        this.subscriptions.push(
            combineLatest(this.store.pipe(select(selectIssuesActive)), this.saved$).pipe(
                map((([issue]) => issue))
            ).subscribe(
                (data: Issue) => {
                    if (data && data.id) {
                        this.snackBar.open(`Successful ${this.isNew ? 'creation' : 'update'}.`);
                        if (this.identifier) {
                            this.router.navigate([`projects/${this.identifier}/issues`, data.id]);
                        } else {
                            this.router.navigate(['issues', data.id]);
                        }
                    }
                }
            ),
        );

        // load priority
        this.store.dispatch(new EnumerationsRequestAction());
    }

    public isNewIssue() {
        return Boolean(this.activatedRoute.snapshot.url.find((url) => url.path === 'new'));
    }

    public load(): void {
        this.store.dispatch(new IssuesItemRequestAction(this.id));
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        const tag = this.allTags.find((tagItem) => this.getTagLabel(tagItem) === event.option.viewValue);
        if (tag && this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
        }
    }

    public getTagLabel(tag: FilterTag): string {
        return tag.name.trim();
    }

    public removeTag(tag: FilterTag): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.tagCtrl.setValue(null);
            this.tagInput.nativeElement.focus();
        }
    }

    private filter(label: string): Array<FilterTag> {
        const ids = this.tags.map((tag) => tag.id);
        const restTags = this.allTags.filter((tag) => ids.indexOf(tag.id) === -1);
        if (!label) {
            return restTags;
        }

        const filterLabel = label.toLowerCase();
        return restTags.filter((tag) =>
            this.getTagLabel(tag).toLowerCase().indexOf(filterLabel) !== -1,
        );
    }

    public onSelection($event: MatSelectChange) {
        this.subscriptions.push(
            this.projects$.subscribe(projects => {
                this.selectProject(projects, $event.value);
            })
        );
    }

    public selectProject(projects: Project[], identifier: string) {
        const [project] = projects.filter((project) => project.identifier === identifier);
        if (project) {
            if (project && project.members) {
                this.tags = [];
                this.allTags = project.members.map((member) => {
                    return {name: member.user.full_name, id: member.user.id};
                });
                this.tagInput.nativeElement.value = '';
                this.tagCtrl.setValue(null);

                // get trackers for project
                // this.store.dispatch(new TrackersIssueRequestAction(project.identifier));
            }
        }
    }

    public onSubmit(): void {
        const controls = this.form.controls;
        if (this.form.invalid) {
            Object.keys(controls).forEach((name) => controls[name].markAsTouched());
            return;
        }
        const watchers = this.tags.map((tag) => tag.id);
        const {
            assigned,
            description,
            done_ratio,
            estimated_hours,
            is_private,
            private_notes,
            notes,
            parent_id,
            priority,
            project,
            status,
            subject,
            tracker
        } = this.form.value;

        const start_date = this.form.value.start_date ? moment(this.form.value.start_date).format('YYYY-MM-DD') : '';
        const due_date = this.form.value.due_date ? moment(this.form.value.due_date).format('YYYY-MM-DD') : '';

        const body: IssueUpdate = {
            assigned_to_id: assigned,
            description,
            done_ratio,
            due_date,
            estimated_hours,
            is_private,
            notes,
            parent_id,
            priority_id: priority,
            private_notes,
            project_identifier: project,
            start_date,
            status_id: status,
            subject,
            tracker_id: tracker,
            watchers
        };
        const action = new IssuesItemSaveRequestAction({id: this.id, body});
        this.requestId = action.requestId;
        this.store.dispatch(action);
    }

    public cancel() {
        if (this.id && !this.identifier) {
            this.router.navigateByUrl(`issues/${this.id}`);
        } else if (this.identifier) {
            this.router.navigateByUrl(`projects/${this.identifier}/issues`);
        } else {
            this.router.navigateByUrl(`issues`);
        }
    }
}
