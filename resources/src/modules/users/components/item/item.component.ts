import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UsersSelectService} from "../../services/users-select.service";
import * as userActions from "../../../users/store/actions/users.actions";

@Component({
  selector: 'profile-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ProfileItemComponent implements OnInit {

    public constructor(
        private router: Router,
        private store: Store<any>,
        protected usersSelectService: UsersSelectService,
        private activatedRoute: ActivatedRoute,
    ) {

    }

  ngOnInit() {
      const {id} = this.activatedRoute.snapshot.params;
      this.store.dispatch(new userActions.OneRequestAction(+id))
  }

}
