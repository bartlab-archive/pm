import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, merge, Subscription, combineLatest } from 'rxjs';
import { filter, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MatPaginator, MatSort, PageEvent, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import {
    Meta,
    PaginationParams,
    Project,
    ProjectStatus,
    ProjectTag,
    projectStatusName,
} from '../../interfaces/projects';
import * as fromProjects from '../../store/reducers';
import * as projectActions from '../../store/actions/projects.actions';
import { RequestStatus } from '../../../../app/interfaces/api';

@Component({
    selector: 'app-projects-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    public visible = true;
    public selectable = true;
    public removable = true;
    public addOnBlur = false;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public tagCtrl = new FormControl();
    public filteredTags: Observable<ProjectTag[]>;
    public statusName = projectStatusName;
    public allTags: ProjectTag[] = [
        {
            id: ProjectStatus.OPEN,
            type: 'status',
            name: this.statusName[ProjectStatus.OPEN],
        },
        {
            id: ProjectStatus.CLOSE,
            type: 'status',
            name: this.statusName[ProjectStatus.CLOSE],
        },
    ];

    public tags: ProjectTag[] = [this.allTags[0]];

    @ViewChild('tagInput')
    public tagInput: ElementRef<HTMLInputElement>;

    public subscriptions: Subscription[] = [];
    public displayedColumns: string[] = ['identifier', 'labels', 'name', 'description', 'manage'];

    public projects$: Observable<Project[]> = this.store.pipe(select(fromProjects.selectProjects));
    public meta$: Observable<Meta> = this.store.pipe(select(fromProjects.selectProjectsMeta));
    public pending$: Observable<boolean> = this.store.pipe(
        select(fromProjects.selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );

    public success$: Observable<boolean> = this.store.pipe(
        select(fromProjects.selectProjectsStatus),
        filter((status) => status === RequestStatus.success),
        mapTo(true),
    );

    public projects: Project[] = [];
    public resultsLength = 0;
    public pageSize = 25;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;

    @ViewChild(MatSort)
    public sort: MatSort;

    public constructor(private router: Router, private store: Store<any>) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string) => this.filter(label)),
        );
    }

    public getTagLabel(tag: ProjectTag): string {
        return `${tag.name}(${tag.type})`;
    }

    private filter(label: string): ProjectTag[] {
        const ids = this.tags.map((tag) => tag.id);
        const restTags = this.allTags.filter((tag) => ids.indexOf(tag.id) === -1);
        if (!label) {
            return restTags;
        }

        const filterLabel = label.toLowerCase();
        return restTags.filter(
            (tag) =>
                this.getTagLabel(tag)
                    .toLowerCase()
                    .indexOf(filterLabel) === 0,
        );
    }

    public add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add filter
        // if ((value || '').trim()) {
        //     this.filters.push(value.trim());
        // }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.tagCtrl.setValue(null);
    }

    public remove(tag: ProjectTag): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.paginator.pageIndex = 0;
            this.load();
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        const tag = this.allTags.find((tagItem) => this.getTagLabel(tagItem) === event.option.viewValue);
        if (tag && this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
            this.paginator.pageIndex = 0;
            this.load();
        }
    }

    public selectedLabel(name) {
        const tag = this.allTags.find((tagItem) => tagItem.name === name);
        if (tag && this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
            this.paginator.pageIndex = 0;
            this.load();
        }
    }

    public load() {
        const params: PaginationParams = {
            page: this.paginator.pageIndex + 1,
            per_page: this.pageSize,
            order: [],
        };

        if (this.sort.active && this.sort.direction) {
            params.order.push(`${this.sort.active}:${this.sort.direction}`);
        }

        if (this.tags.length > 0) {
            params.status_ids = this.tags.map((tag) => tag.id);
        }

        this.store.dispatch(new projectActions.ListRequestAction(params));
    }

    public refresh(): void {
        this.load();
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0)),
            merge(this.sort.sortChange, this.paginator.page)
                .pipe(
                    startWith({}),
                    switchMap(() => {
                        this.load();
                        return this.success$;
                    }),

                    switchMap(() => combineLatest(this.projects$, this.meta$)),
                    map(([projects, meta]) => {
                        this.resultsLength = meta.total;
                        return projects;
                    }),
                )
                .subscribe((projects: Project[]) => (this.projects = projects)),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public onPageChange($event: PageEvent): void {
        this.pageSize = $event.pageSize;
    }

    public onSelectProject(project: Project): void {
        this.router.navigate(['/projects', project.identifier]);
    }
}
