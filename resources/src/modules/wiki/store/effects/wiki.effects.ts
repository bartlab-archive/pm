import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {normalize} from 'normalizr';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {WikiService} from '../../services';
import {
    ItemRequestAction,
    ItemSuccessAction,
    ItemErrorAction,
    WikiListRequestAction,
    WikiActionTypes,
    WikiListSuccessAction,
    WikiListErrorAction,
} from '../actions/wiki.action';

import {ResponseError} from '../../../../app/interfaces/api';
import {wikiSchema} from '../schemas';

@Injectable()
export class WikiEffects {
    @Effect()
    protected issues$ = this.actions$.pipe(
        ofType<WikiListRequestAction>(WikiActionTypes.LIST_REQUEST),
        map((action) => action.payload),
        exhaustMap((params) =>
            this.wikiService.list(params).pipe(
                map((response: any) => {
                    const payload = {
                        meta: response.meta,
                        ...normalize(response.data, [wikiSchema]),
                    };

                    return new WikiListSuccessAction(payload);
                }),
                catchError((response) => of(new WikiListErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected item$ = this.actions$.pipe(
        ofType<ItemRequestAction>(WikiActionTypes.ITEM_REQUEST),
        map((action) => action.payload),
        exhaustMap((id: number) =>
            this.wikiService.one(id).pipe(
                map((response: any) => {
                    const payload = {
                        // meta: response.meta,
                        ...normalize(response.data, wikiSchema),
                    };

                    return new ItemSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new ItemErrorAction(response))),
            ),
        ),
    );

    public constructor(protected actions$: Actions, protected wikiService: WikiService) {
    }
}
