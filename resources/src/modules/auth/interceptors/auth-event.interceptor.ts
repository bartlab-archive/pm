import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppInterceptor, AppInterceptorHandler} from '../../../app/interfaces/app';
import * as fromAuth from '../store/reducers';
import * as authActions from '../store/actions/auth.actions';
import {AuthService} from '../services/auth.service';
import {AppEventsUnion, AppPreloadEvent, EVENT_TYPE_PRELOAD} from '../../../app/events';
import {filter, first} from 'rxjs/operators';
import {LayoutsSetTopItems} from '../store/actions/shared.action';
import {RequestStatus} from '../../../app/interfaces/api';

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
        if (!this.authService.isAuthorized()) {
            return;
        }

        this.store
            .pipe(
                select(fromAuth.selectAuthStatus),
                filter((status) => status === RequestStatus.success || status === RequestStatus.error),
                first(),
            )
            .subscribe((status) => {
                if (status === RequestStatus.success && this.authService.isAuthorized()) {
                    this.addTopMenu();
                    next.handle(appEvent);
                }

                if (status === RequestStatus.error) {
                    this.authService.onUnauthorizedError(null);
                }
            });

        this.store.dispatch(new authActions.PreloadRequestAction());
    }

    public addTopMenu(): void {
        const user = this.authService.getUser();

        if (!user) {
            return;
        }

        // todo: clear by logout action
        this.store.dispatch(new LayoutsSetTopItems([
            {
                icon: 'account_circle',
                path: `/users/${user.id}`,
                title: 'Profile',
            },
            {
                icon: 'settings',
                path: '/my/account',
                title: 'My account',
            },
            {
                icon: 'exit_to_app',
                path: '/logout',
                title: 'Logout',
            },
        ]));
    }
}
