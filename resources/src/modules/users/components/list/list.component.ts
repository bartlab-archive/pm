import { Component, OnInit } from '@angular/core';
import * as userActions from "../../../users/store/actions/users.actions";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {PaginationParams} from "../../interfaces/users";

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {

    public constructor(private router: Router, private store: Store<any>) {

    }

  ngOnInit() {
    console.log('UsersListComponent ngOnInit');
      const params: PaginationParams = {
          page: 1,
          per_page: 10,
      };
      this.store.dispatch(new userActions.ListRequestAction(params));

  }

}
