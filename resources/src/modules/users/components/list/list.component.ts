import {Component, OnInit, ViewChild} from '@angular/core';
import * as userActions from "../../../users/store/actions/users.actions";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {PaginationParams} from "../../interfaces/users";
import {MatPaginator} from '@angular/material';
import {UsersSelectService} from "../../services/users-select.service";

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

    ngOnInit(): void {
        this.usersSelectService.users$
            .subscribe((users) => {
                this.users = users;
            });
        this.store.dispatch(new userActions.ListRequestAction(this.params));

    }

}
