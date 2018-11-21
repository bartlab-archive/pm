import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppInterceptor, AppInterceptorHandler} from '../../../app/interfaces/app';
import * as fromAuth from '../store/reducers';
import * as authActions from '../store/actions/auth.actions';
import {AuthService} from '../services/auth.service';
import {AppEventsUnion, AppPreloadEvent, EVENT_TYPE_PRELOAD} from '../../../app/events';
import {filter, first} from "rxjs/operators";

@Injectable()
export class AuthEventInterceptor implements AppInterceptor {
    public constructor(private authService: AuthService, private store: Store<any>) {
    }

    public on(appEvent: AppEventsUnion, next: AppInterceptorHandler): void {
        switch (appEvent.type) {
            case EVENT_TYPE_PRELOAD: {
                return this.onPreload(appEvent, next);
            }

            default: {
                return next.handle(appEvent);
            }
        }
    }

    public onPreload(appEvent: AppPreloadEvent, next: AppInterceptorHandler): void {
        console.log('AuthEventInterceptor');
        if(!this.authService.isAuthorized()){
            return;
        }

        this.store
            .pipe(
                select(fromAuth.selectAuthStatus),
                filter(status => status === 'success' || status === 'error'),
                first(),
            )
            .subscribe(() => {
                if(this.authService.isAuthorized()){
                    next.handle(appEvent);
                }
            });

        this.store.dispatch(new authActions.PreloadRequestAction());
    }
}
