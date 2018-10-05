import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromAuth from '../store/reducers';
import {distinctUntilChanged, filter, mapTo, skip, withLatestFrom} from 'rxjs/operators';
import {FormResponseError} from '../../main/interfaces/api';
import {AuthData} from '../interfaces/auth';

@Injectable()
export class AuthSelectService {
    data$: Observable<AuthData> = this.store.pipe(select(fromAuth.getAuthData));
    error$: Observable<FormResponseError> = this.store.pipe(select(fromAuth.getAuthError));
    pending$: Observable<boolean> = this.store.pipe(select(fromAuth.getAuthPending));
    success$: Observable<boolean>;

    constructor(
        private store: Store<fromAuth.State>,
    ) {
        this.success$ = this.combineSuccessPipe(this.pending$, this.error$);
    }

    combineSuccessPipe(pending$: Observable<boolean>, error$: Observable<FormResponseError>): Observable<boolean> {
        return pending$.pipe(
            // skip initial
            skip(1),

            // get only changes
            distinctUntilChanged(),

            // add latest error state
            withLatestFrom(error$),

            // filter pending finished and error empty
            filter(([pending, error]) => !pending && !error),

            // map to success result
            mapTo(true),
        );
    }
}
