import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {normalize} from 'normalizr';
import * as UserActions from '../actions/users.actions';
import {ListResponse, PaginationParams, ProjectResponse} from '../../interfaces/users';
import {ResponseError} from '../../../../app/interfaces/api';
import {usersSchema} from '../schemas';
import {UserService} from "../../services/user.service";

@Injectable()
export class UsersEffects {
    @Effect()
    protected list$ = this.actions$.pipe(
        ofType<UserActions.ListRequestAction>(UserActions.ActionTypes.LIST_REQUEST),
        // delay(3000),
        map((action) => action.payload),
        exhaustMap((data: PaginationParams) =>
            this.userService.all(data).pipe(
                map((response: ListResponse) => {
                    const payload = {
                        meta: response.meta,
                        ...normalize(response.data, [usersSchema]),
                    };
                    return new UserActions.ListSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new UserActions.ListErrorAction(response))),
            ),
        ),
    );


    public constructor(protected actions$: Actions, protected userService: UserService) {
    }
}
