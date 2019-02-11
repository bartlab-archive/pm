import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {MatPaginator} from '@angular/material';
import {filter} from 'rxjs/operators';
import * as userActions from '../../../users/store/actions/users.actions';
import {ListRequestParams} from '../../interfaces/users';
import {selectUsers, selectUsersMeta} from '../../store/selectors/users';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
    public displayedColumns: string[] = ['position', 'fullName', 'status', 'created', 'menu'];
    public users;
    protected statuses: null;
    protected subscriptions: Array<Subscription> = [];

    public params: ListRequestParams = {
        page: 1,
        per_page: 10,
    };

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;

    public constructor(
        private router: Router,
        private store: Store<any>,
    ) {
    }

    private getPagination(): ListRequestParams {
        return {
            page: this.paginator.pageIndex + 1,
            per_page: this.paginator.pageSize,
            status: this.statuses,
        };
    }

    public onPageChange(): void {
        this.loadUsers(this.getPagination());
    }

    private loadUsers(params) {
        this.store.dispatch(new userActions.ListRequestAction(params));
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.store.pipe(select(selectUsers))
                .subscribe((users) => {
                    this.users = users;
                }),
            this.store
                .pipe(
                    select(selectUsersMeta),
                    filter((data) => Boolean(data)),
                )
                .subscribe((data) => {
                    this.paginator.pageSize = data.per_page;
                    this.paginator.pageIndex = data.current_page - 1;
                    this.paginator.length = data.total;
                }),
            this.store
                .pipe(
                    select(selectUsersMeta),
                    filter((data) => Boolean(data)),
                )
                .subscribe((data) => {
                    this.paginator.pageSize = data.per_page;
                    this.paginator.pageIndex = data.current_page - 1;
                    this.paginator.length = data.total;
                }),
        );

        this.loadUsers(this.params);
    }

    public onChangeFilter(data): void {
        this.loadUsers({
            per_page: this.paginator.pageSize,
            page: 1,
            status: data.map(({id}) => id),
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

}
