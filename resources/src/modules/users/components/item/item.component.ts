import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as userActions from "../../../users/store/actions/users.actions";
import {FormBuilder} from "@angular/forms";
import {selectUserActive, selectUsersPending} from "../../store/selectors/users";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../../interfaces/users";

@Component({
    selector: 'profile-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ProfileItemComponent implements OnInit {
    public user$: Observable<User>;
    public pending$: Observable<boolean>;
    public id: number;

    public form = this.fb.group({
        login: [{value: '', disabled: true}],
        firstName: [{value: '', disabled: true}],
        lastName: [{value: '', disabled: true}],
    });

    public constructor(
        private router: Router,
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {

    }

    ngOnInit() {
        const {id} = this.activatedRoute.snapshot.params;
        this.id = id;
        this.store.dispatch(new userActions.OneRequestAction(+id));
        this.user$ = this.store.pipe(select(selectUserActive));
        this.user$.subscribe((user: User) => {
            if (user) {
                this.form.patchValue({
                    login: user.login,
                    firstName: user.firstname,
                    lastName: user.lastname,
                });
            }

        });
        this.pending$ = this.store.pipe(select(selectUsersPending));
    }

}
