import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {EnumerationsService} from '../../services';
import {normalize} from 'normalizr';
import {prioritiesSchema} from '../schemas';

import {
    EnumerationsRequestAction,
    EnumerationsSuccessAction,
    EnumerationsErrorAction,
    EnumerationsActionTypes,
} from '../actions/enumerations.action';

@Injectable()
export class EnumerationsEffect {
    @Effect()
    protected priorities$ = this.actions$.pipe(
        ofType<EnumerationsRequestAction>(EnumerationsActionTypes.ENUMERATIONS_REQUEST),
        exhaustMap(() =>
            this.enumerationsService.getPriorities().pipe(
                map((response: any) => {
                    const payload = {
                        ...normalize(response.data, [prioritiesSchema]),
                    };

                    return new EnumerationsSuccessAction(payload);
                }),
                catchError((response) => of(new EnumerationsErrorAction(response))),
            ),
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected enumerationsService: EnumerationsService,
    ) {

    }
}
