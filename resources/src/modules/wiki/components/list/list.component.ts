import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FilterTag} from '../../interfaces/wiki';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable, Subscription, zip, combineLatest} from 'rxjs';
import {
    filter,
    map,
    startWith,
} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectWiki, selectWikiMeta, selectWikiStatus} from '../../store/selectors/wiki';

import {WikiListRequestAction} from '../../store/actions/wiki.action';
import {RequestStatus} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-issues-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class WikiListComponent implements OnInit, OnDestroy {
    public displayedColumns: Array<string> = ['select', 'subject', 'menu'];
    public dataSource: Array<object>;
    public selection = new SelectionModel<any>(true, []);
    public subscriptions: Array<Subscription> = [];
    public pending = false;

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;
    public pageSizeOptions: Array<number> = [20, 50, 100];
    private prevPageSize = this.pageSizeOptions[0];

    @ViewChild(MatSort)
    public sort: MatSort;

    @ViewChild('scrollContainer')
    public scrollContainer: ElementRef<HTMLElement>;

    @ViewChild('tagInput')
    public tagInput: ElementRef<HTMLInputElement>;
    public allTags: Array<FilterTag> = [];
    public tags: Array<FilterTag> = [];
    public tagCtrl = new FormControl();
    public separatorKeysCodes: Array<number> = [ENTER, COMMA];
    public filteredTags: Observable<Array<FilterTag>>;

    public constructor(private store: Store<any>) {
    }

    public ngOnInit(): void {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string) => this.filter(label)),
        );

        this.subscriptions.push(
            combineLatest(this.store.pipe(select(selectWikiStatus))).subscribe((statuses) => {
                this.pending = statuses.some((status) => status === RequestStatus.pending);
            }),

            this.store.pipe(select(selectWiki)).subscribe((items) => {
                this.dataSource = items;
            }),

            this.store
                .pipe(
                    select(selectWikiMeta),
                    filter((data) => Boolean(data)),
                )
                .subscribe((data) => {
                    this.paginator.pageSize = data.per_page;
                    this.paginator.pageIndex = data.current_page - 1;
                    this.paginator.length = data.total;
                    this.prevPageSize = parseInt(data.per_page, 10);
                }),
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.scrollContainer.nativeElement.scroll(0, 0);
        // this.store.dispatch(
        //     new WikiListRequestAction({
        //         per_page: this.paginator.pageSize || this.pageSizeOptions[0],
        //         page: this.paginator.pageIndex + 1,
        //         'status_ids[]': this.getTagsId('status'),
        //         'tracker_ids[]': this.getTagsId('tracker'),
        //     }),
        // );
    }

    public getTagsId(type: string) {
        return this.tags.filter((tag) => tag.type === type).map((tag) => tag.id);
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
        const tag = this.allTags.find((tagItem) => this.getTagLabel(tagItem) === event.option.viewValue);
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
        const restTags = this.allTags.filter((tag) => ids.indexOf(tag.id) === -1);
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
        if (this.prevPageSize !== $event.pageSize) {
            this.paginator.pageIndex = 0;
        }
        this.load();
    }
}
