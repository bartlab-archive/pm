import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {MatPaginator} from '@angular/material';
import {filter} from "rxjs/operators";

import * as userActions from "../../../users/store/actions/users.actions";
import {PaginationParams, Status, UsersStatusNames} from "../../interfaces/users";
import {UsersSelectService} from "../../services/users-select.service";
import {selectUsersMeta} from "../../store/selectors/users";

@Component({
    selector: 'users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {
    public displayedColumns: string[] = ['position', 'fullName', 'status', 'created', 'menu'];
    public users;
    protected statuses: null;

    params: PaginationParams = {
        page: 1,
        per_page: 10,
    };


    public constructor(
        private router: Router,
        private store: Store<any>,
        protected usersSelectService: UsersSelectService,
    ) {

    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    getPagination(): PaginationParams {
        return {
            page: this.paginator.pageIndex + 1,
            per_page: this.paginator.pageSize,
            status: this.statuses
        };
    }

    public getStatusById(status): Status {
       return UsersStatusNames.find( item => item.id === status)
    }

    public onPageChange(): void {
        this.loadUsers(this.getPagination());
    }

    loadUsers(params) {
        this.store.dispatch(new userActions.ListRequestAction(params));
    }

    ngOnInit(): void {
        this.usersSelectService.users$
            .subscribe((users) => {
                this.users = users;
            });
        this.store
            .pipe(
                select(selectUsersMeta),
                filter((data) => Boolean(data))
            )
            .subscribe((data) => {
                this.paginator.pageSize = data.per_page;
                this.paginator.pageIndex = data.current_page - 1;
                this.paginator.length = data.total;
            });

        this.loadUsers(this.params);

    }

    onChangeFilter(data): void {
        this.statuses = data.map(({id}) => id);

        this.store.dispatch(new userActions.ListRequestAction({
            per_page: this.paginator.pageSize,
            page: 1,
            status: this.statuses
        }));

    }

}
