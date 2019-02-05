import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, exhaustMap, map} from 'rxjs/operators';
import {normalize} from 'normalizr';
import * as UserActions from '../actions/users.actions';
import {ListResponse, PaginationParams, UserResponse} from '../../interfaces/users';
import {ResponseError} from '../../../../app/interfaces/api';
import {usersSchema} from '../schemas';
import {UsersService} from "../../services/users.service";

@Injectable()
export class UsersEffects {
    @Effect()
    protected list$ = this.actions$.pipe(
        ofType<UserActions.ListRequestAction>(UserActions.ActionTypes.LIST_REQUEST),
        map((action) => action.payload),
        exhaustMap((params: PaginationParams) =>
            this.userService.all(params).pipe(
                map(({ meta, data }: ListResponse) => {
                    const payload = {
                        meta,
                        ...normalize(data, [usersSchema]),
                    };
                    return new UserActions.ListSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new UserActions.ListErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<UserActions.OneRequestAction>(UserActions.ActionTypes.ONE_REQUEST),
        map((action) => action.payload),
        exhaustMap((id: number) =>
            this.userService.one(id).pipe(
                map(({  data }: UserResponse) => {
                    const payload = {
                        ...normalize([data], [usersSchema]),
                    };
                    return new UserActions.OneSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new UserActions.OneErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected update$ = this.actions$.pipe(
        ofType<UserActions.UpdateRequestAction>(UserActions.ActionTypes.UPDATE_REQUEST),
        map((action) => action.payload),
        exhaustMap((request) =>
            this.userService.update(request.id, request.body).pipe(
                map(({  data }: UserResponse) => {
                    const payload = {
                        ...normalize([data], [usersSchema]),
                    };
                    return new UserActions.UpdateSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new UserActions.UpdateErrorAction(response))),
            ),
        ),
    );


    public constructor(protected actions$: Actions, protected userService: UsersService) {
    }
}
