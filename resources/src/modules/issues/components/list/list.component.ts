import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    MatAutocompleteSelectedEvent,
    MatPaginator,
    MatSort,
    PageEvent,
    MatDialog,
} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable, Subscription, zip, combineLatest} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

import {RequestStatus} from '../../../../app/interfaces/api';
import {selectTrackers} from '../../store/selectors/trackers';
import {selectStatuses} from '../../store/selectors/statuses';
import {FilterTag, Issue} from '../../interfaces/issues';
import {
    selectIssues,
    selectIssuesMeta,
    selectIssuesRequestId,
    selectIssuesStatus,
} from '../../store/selectors/issues';
import {IssuesAllRequestAction, IssuesItemRemoveRequestAction} from '../../store/actions/issues.action';
import {AppConfirmDialogComponent} from '../../../../app/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-issues-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class IssuesListComponent implements OnInit, OnDestroy {
    public displayedColumns: Array<string> = ['select', 'icon', 'subject', 'menu'];
    public dataSource: Array<object>;
    public selection = new SelectionModel<any>(true, []);
    public subscriptions: Array<Subscription> = [];
    public pending = false;
    public removeRequestId = null;

    public status$ = this.store.pipe(select(selectIssuesStatus));
    public requestId$ = this.store.pipe(select(selectIssuesRequestId));
    public removed$ = combineLatest(this.status$, this.requestId$).pipe(
        filter(([status, requestId]) => Boolean(status) && Boolean(requestId)),
        filter(([status, requestId]) => status === RequestStatus.success && requestId === this.removeRequestId),
    );

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;
    public pageSizeOptions: Array<number> = [20, 50, 100];
    private prevPageSize = this.pageSizeOptions[0];

    @ViewChild(MatSort)
    public sort: MatSort;

    @ViewChild('tagInput')
    public tagInput: ElementRef<HTMLInputElement>;
    public allTags: Array<FilterTag> = [];
    public tags: Array<FilterTag> = [];
    public tagCtrl = new FormControl();
    public separatorKeysCodes: Array<number> = [ENTER, COMMA];
    public filteredTags: Observable<Array<FilterTag>>;
    public routerUrl: string = this.router.url;
    public identifier: string = this.activatedRoute.snapshot.paramMap.get('identifier');

    public constructor(
        private store: Store<any>,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string) => this.filter(label)),
        );

        this.subscriptions.push(
            combineLatest(
                this.store.pipe(select(selectIssuesStatus)),
                this.store.pipe(select(selectStatuses)),
            ).subscribe((statuses) => {
                this.pending = statuses.some(
                    (status) => status === RequestStatus.pending,
                );
            }),

            this.store.pipe(select(selectIssues)).subscribe((items) => {
                this.dataSource = items;
            }),

            this.store
                .pipe(
                    select(selectIssuesMeta),
                    filter((data) => Boolean(data)),
                )
                .subscribe((data) => {
                    this.paginator.pageSize = data.per_page;
                    this.paginator.pageIndex = data.current_page - 1;
                    this.paginator.length = data.total;
                    this.prevPageSize = parseInt(data.per_page, 10);
                }),

            zip(
                this.store.pipe(select(selectStatuses)),
                this.store.pipe(select(selectTrackers)),
            )
                .pipe(
                    filter(
                        ([statuses, trackers]) =>
                            statuses.length > 0 && trackers.length > 0,
                    ),
                )
                .subscribe(([statuses, trackers]) => {
                    this.allTags.push(
                        ...statuses.map((status) => {
                            const nStatus = {
                                name: status.name,
                                id: status.id,
                                type: 'status',
                            };
                            if (!status.is_closed) {
                                this.tags.push(nStatus);
                            }
                            return nStatus;
                        }),

                        ...trackers.map((tracker) => {
                            return {
                                name: tracker.name,
                                id: tracker.id,
                                type: 'tracker',
                            };
                        }),
                    );

                    this.tagInput.nativeElement.value = '';
                    this.tagCtrl.setValue(null);
                    this.load();
                }),

            this.removed$.subscribe(() => {
                this.load();
            }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }

    public load(): void {
        this.store.dispatch(
            new IssuesAllRequestAction({
                per_page: this.paginator.pageSize || this.pageSizeOptions[0],
                page: this.paginator.pageIndex + 1,
                'status_ids[]': this.getTagsId('status'),
                'tracker_ids[]': this.getTagsId('tracker'),
                'identifier': this.identifier || ''
            }),
        );
    }

    public getTagsId(type: string) {
        return this.tags
            .filter((tag) => tag.type === type)
            .map((tag) => tag.id);
    }

    public isAllSelected(): boolean {
        return this.selection.selected.length === this.dataSource.length;
    }

    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     */
    public masterToggle(): void {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.forEach((row: any) => this.selection.select(row));
    }

    public refresh(): void {
        this.paginator.pageIndex = 0;
        this.load();
    }

    public getTagLabel(tag: FilterTag): string {
        return `${tag.name} (${tag.type})`;
    }

    public removeTag(tag: FilterTag): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
            // this.paginator.pageIndex = 0;
            // this.tagCtrl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
            this.tagCtrl.setValue(null);
            this.tagInput.nativeElement.focus();
            this.refresh();
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        const tag = this.allTags.find(
            (tagItem) => this.getTagLabel(tagItem) === event.option.viewValue,
        );
        if (tag && this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
            // this.paginator.pageIndex = 0;
            this.refresh();
        }
    }

    private filter(label: string): Array<FilterTag> {
        const ids = this.tags.map((tag) => tag.id);
        const restTags = this.allTags.filter(
            (tag) => ids.indexOf(tag.id) === -1,
        );
        if (!label) {
            return restTags;
        }

        const filterLabel = label.toLowerCase();
        return restTags.filter(
            (tag) =>
                this.getTagLabel(tag)
                    .toLowerCase()
                    .indexOf(filterLabel) !== -1,
        );
    }

    public onPageChange($event: PageEvent): void {
        // const {per_page} = selectIssuesMeta.projector();
        if (this.prevPageSize !== $event.pageSize) {
            this.paginator.pageIndex = 0;
        }
        // this.prevPageSize = $event.pageSize;
        this.load();
    }

    public remove(item: Issue) {
        const dialogRef = this.dialog.open((AppConfirmDialogComponent), {
            width: '500px',
            data: {text: `Do you want to delete "${item.subject}" issue?`},
        });
        dialogRef.afterClosed()
            .pipe(
                filter((result) => Boolean(result)),
            )
            .subscribe(() => {
                const action = new IssuesItemRemoveRequestAction(item.id);
                this.removeRequestId = action.requestId;
                this.store.dispatch(action);
            });
    }
}
