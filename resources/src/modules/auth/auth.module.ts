import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActivationStart, Router, RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
} from '@angular/material';
import {
    ResetComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    AuthMainComponent,
} from './components';
import { AuthService } from './services/auth.service';
import { BlankComponent } from '../layouts/components';
import { reducers, metaReducers } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { filter } from 'rxjs/operators';
import { LayoutsService } from '../layouts/services/layouts.service';
import * as AuthActions from './store/actions/auth.actions';
import { AuthEventInterceptor } from './interceptors/auth-event.interceptor';
import {APP_EVENT_PRELOAD, APP_EVENT_INTERCEPTORS} from '../../app/providers/app.injection';

const authRoutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: '',
                component: AuthMainComponent,
                data: { auth: 'guest' },
                children: [
                    { path: 'login', component: LoginComponent },
                    { path: 'account/register', component: RegistrationComponent },
                    { path: 'account/lost_password', component: ResetComponent },
                ],
            },
        ],
    },
    {
        path: 'logout',
        component: LogoutComponent,
        data: { auth: 'authorized' },
    },
];

@NgModule({
    declarations: [AuthMainComponent, LoginComponent, RegistrationComponent, ResetComponent, LogoutComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        StoreModule.forFeature('auth', reducers, { metaReducers }),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: AuthEventInterceptor,
            multi: true,
        },
        {
            provide: APP_EVENT_PRELOAD,
            useValue: [
                AuthActions.ActionTypes.LOGIN_SUCCESS,
                AuthActions.ActionTypes.LOGOUT,
            ],
            multi: true,
        },
    ],
})
export class AuthModule {
    public constructor(
        private authService: AuthService,
        private router: Router,
        private layoutsService: LayoutsService,
        private store: Store<any>,
    ) {
        this.authService.unauthorized$.subscribe(() => {
            this.store.dispatch(new AuthActions.LogoutAction());
            return this.router.navigate(['/login']);
        });

        this.authService.forbidden$.subscribe(() => {
            return this.router.navigate(['/']);
        });

        this.router.events
            .pipe(filter((event) => event instanceof ActivationStart))
            .subscribe(({ snapshot }: ActivationStart) => {
                if (snapshot.data.hasOwnProperty('auth')) {
                    if (snapshot.data.auth === 'guest' && this.authService.isAuthorized()) {
                        return this.router.navigate(['/']);
                    }

                    if (snapshot.data.auth === 'authorized' && !this.authService.isAuthorized()) {
                        return this.router.navigate(['/login']);
                    }
                }
            });

        this.layoutsService
            .addTopMenuItem({ icon: 'account_circle', path: '/users/1', title: 'Profile' })
            .addTopMenuItem({ icon: 'settings', path: '/my/account', title: 'My account' })
            .addTopMenuItem({ icon: 'exit_to_app', path: '/logout', title: 'Logout' });
    }
}
