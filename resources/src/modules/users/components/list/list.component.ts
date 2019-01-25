import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {MatPaginator} from '@angular/material';
import {filter} from "rxjs/operators";

import * as userActions from "../../../users/store/actions/users.actions";
import {PaginationParams} from "../../interfaces/users";
import {UsersSelectService} from "../../services/users-select.service";
import {selectUsersMeta} from "../../store/selectors/users";

@Component({
    selector: 'users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {
    public displayedColumns: string[] = ['position', 'fullName', 'status', 'created'];
    public users;

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
        };
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

}
