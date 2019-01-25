import {Injectable} from '@angular/core';
import {createSelector, select, Store} from "@ngrx/store";

import {denormalize} from 'normalizr';
import {AppSelectService} from "../../../app/services/app-select.service";
import {usersSchema} from "../../users/store/schemas";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../interfaces/users";
import {selectUsersIds} from "../store/reducers";

@Injectable({
    providedIn: 'root',
})

@Injectable()
export class UsersSelectService {
    public selectUsers;
    public modulesSelectors = [
        'moduleUsers.users.entities',
    ];

    public users$: Observable<User>;


    public constructor(
        private store: Store<any>,
        public appSelectorsService: AppSelectService,
    ) {
        this.initSelectors();
    }

    initSelectors() {
        const entitiesSelectors = this.appSelectorsService.getSelectors(this.modulesSelectors);
        const mapEntitiesToObject = this.appSelectorsService.getMapEntitiesToObject(this.modulesSelectors);

        this.selectUsers = createSelector(
            [selectUsersIds, ...entitiesSelectors] as any,
            (ids, ...entities) => denormalize(ids, [usersSchema], mapEntitiesToObject(...entities)),
        );

        this.users$ = this.store.pipe(select(this.selectUsers));
    }
}
