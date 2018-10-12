import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, merge, Subscription, combineLatest} from 'rxjs';
import {filter, map, mapTo, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator, MatSort, PageEvent, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Meta, PaginationParams, Project, ProjectStatus} from '../../interfaces/projects';
import * as fromProjects from '../../store/reducers';
import * as projectActions from '../../store/actions/projects.actions';
import {RequestStatus} from '../../../../app/interfaces/api';

interface Tag {
    name: string;
    type: string;
    id: number;
}

@Component({
    selector: 'app-projects-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    // FILTER section start
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl();
    filteredTags: Observable<Tag[]>;
    tags: Tag[] = [];
    statusName = {
        [ProjectStatus.CLOSE]: 'Close',
        [ProjectStatus.OPEN]: 'Open',
        [ProjectStatus.ARCHIVE]: 'Archive',
    };

    allTags: Tag[] = [
        {
            type: 'status',
            name: this.statusName[ProjectStatus.CLOSE],
            id: ProjectStatus.CLOSE,
        },
        {
            type: 'status',
            name: this.statusName[ProjectStatus.OPEN],
            id: ProjectStatus.OPEN,
        },
    ];

    @ViewChild('tagInput')
    public tagInput: ElementRef<HTMLInputElement>;
    // FILTER section end

    public subscriptions: Subscription[] = [];
    public displayedColumns: string[] = [
        'identifier',
        'name',
        'description',
        'status'
    ];

    public projects$: Observable<Project[]> = this.store.pipe(select(fromProjects.selectProjectsData));
    public meta$: Observable<Meta> = this.store.pipe(select(fromProjects.selectProjectsMeta));
    public pending$: Observable<boolean> = this.store.pipe(
        select(fromProjects.selectProjectsStatus),
        map(status => status === RequestStatus.pending),
    );

    public success$: Observable<boolean> = this.store.pipe(
        select(fromProjects.selectProjectsStatus),
        filter(status => status === RequestStatus.success),
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

    // FILTER section start
    public constructor(
        private store: Store<any>,
    ) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string) => label ? this._filter(label) : this.allTags.slice())
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

    public remove(tag: Tag): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.load();
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        const tag = this.allTags.find(tagItem => this.getTagLabel(tagItem) === event.option.viewValue);
        if (tag) {
            this.tags.push(tag);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
            this.load();
        }
    }

    public getTagLabel(tag: Tag): string {
        return `${tag.name}(${tag.type})`;
    }

    private _filter(label: string): Tag[] {
        const filterLabel = label.toLowerCase();
        return this.allTags.filter(tag => this.getTagLabel(tag).toLowerCase().indexOf(filterLabel) === 0);
    }

    // FILTER section end

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
            params.status_ids = this.tags.map(tag => tag.id);
        }

        this.store.dispatch(new projectActions.ListRequestAction(params));
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.sort.sortChange
                .subscribe(() => this.paginator.pageIndex = 0),

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
                .subscribe((projects: Project[]) => this.projects = projects),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public onPageChange($event: PageEvent) {
        this.pageSize = $event.pageSize;
    }
}
