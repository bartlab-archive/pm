import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {ProjectsService} from '../../services/projects.service';
import {ListResponse, Project} from '../../interfaces/projects';
import * as projectActions from '../../store/actions/projects.actions';

@Component({
    selector: 'app-projects-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public displayedColumns: string[] = [
        'id',
        'name',
        'description',
        'isPublic'
    ];

    public dataSource: MatTableDataSource<Project>;
    public pending = false;
    public projects: any[] = [];

    // MatPaginator Inputs
    public length = 0;
    public pageSize = 25;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    public constructor(
        private store: Store<any>,
        private router: Router,
        private projectsService: ProjectsService,
    ) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource();
    }

    public ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.store.dispatch(new projectActions.ListRequestAction(null));

        this.subscriptions.push(
            this.projectsService
                .all({
                    page: 1,
                    per_page: this.pageSize,
                    order: [],
                    status_ids: [],
                    public: [],
                })
                .subscribe((res: ListResponse) => {
                    this.dataSource.data = res.data;
                    this.dataSource.paginator.length = 10000;
                }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onPageChange($event: PageEvent) {
        console.log($event);
    }
}
