import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {MarkdownModule} from 'ngx-markdown';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers, metaReducers} from './store/reducers';
import {AppComponent} from './components/app.component';
import {MainModule} from '../modules/main/main.module';
import {AuthModule} from '../modules/auth/auth.module';
import {ProjectsModule} from '../modules/projects/projects.module';
import {LayoutsModule} from '../modules/layouts/layouts.module';
import {IssuesModule} from '../modules/issues/issues.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {AppService} from './services/app.service';
import {FormService} from './services/form.service';
import {APP_EVENT_PRELOAD, APP_EVENT_INTERCEPTORS, APP_MODULES_SELECTORS} from './providers/app.injection';
import {AppEventInterceptor} from './interceptors/app-event.interceptor';
import {AppEffects} from './store/effects/app.effects';
import * as appActions from './store/actions/app.actions';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppInterceptor} from './interceptors/app.interceptor';
import {selectUsersEntities, selectMembersEntities, selectRolesEntities} from './store/reducers/app.reducer';
import {UsersModule} from "../modules/users/users.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        // Router,
        RouterModule.forRoot(
            [
                // {path: '', redirectTo: '/index', pathMatch: 'full'},
                {path: '**', redirectTo: '/404'},
            ],
            {
                // useHash: true
                // enableTracing: true, // <-- debugging purposes only
                // preloadingStrategy: SelectivePreloadingStrategy,
                scrollPositionRestoration: 'top',
                onSameUrlNavigation: 'reload',
            },
        ),
        // RouterModule.forChild(routes),

        // store
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),

        MatSnackBarModule,

        // modules
        MainModule,
        LayoutsModule,
        AuthModule,
        ProjectsModule,
        IssuesModule,
        UsersModule,
        MarkdownModule.forRoot(),
    ],
    providers: [
        AppService,
        FormService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
            },
        },
        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: AppEventInterceptor,
            multi: true,
        },
        {
            provide: APP_EVENT_PRELOAD,
            useValue: [
                appActions.ActionTypes.INIT,
            ],
            multi: true,
        },
        {
            provide: APP_MODULES_SELECTORS,
            useValue: {
                moduleApp: {

                    users: {
                        entities: selectUsersEntities,
                    },

                    members: {
                        entities: selectMembersEntities,
                    },

                    roles: {
                        entities: selectRolesEntities,
                    },
                }
            },

            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private store: Store<any>) {
        this.store.dispatch(new appActions.InitAction());
    }
}
