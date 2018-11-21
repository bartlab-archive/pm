import {BrowserModule} from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers, metaReducers} from './store/reducers';
import {AppComponent} from './components/app.component';
import {MainModule} from '../modules/main/main.module';
import {AuthModule} from '../modules/auth/auth.module';
import {ProjectsModule} from '../modules/projects/projects.module';
import {LayoutsModule} from '../modules/layouts/layouts.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppInterceptor} from './interceptors/app.interceptor';
import {AppService} from './services/app.service';
import {FormService} from './services/form.service';
import {IssuesModule} from '../modules/issues/issues.module';
import {APP_EVENT_INTERCEPTORS} from './providers/app.injection';
import {Observable, of} from 'rxjs';


class AppEventInterceptor {

    public static on(...args) {
        console.log('AppEventInterceptor', args);
        return of();
    }

}


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        // Router,
        RouterModule.forRoot(
            [
                // {path: '', redirectTo: '/index', pathMatch: 'full'},
                {path: '**', redirectTo: '/404'}
            ],
            {
                // useHash: true
                // enableTracing: true, // <-- debugging purposes only
                // preloadingStrategy: SelectivePreloadingStrategy,
                scrollPositionRestoration: 'top',
                onSameUrlNavigation: 'reload'
            }
        ),
        // RouterModule.forChild(routes),

        // store
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),

        MatSnackBarModule,

        // modules
        MainModule,
        LayoutsModule,
        AuthModule,
        ProjectsModule,
        IssuesModule
    ],
    providers: [
        AppService,
        FormService,
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
        {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
        {provide: APP_EVENT_INTERCEPTORS, useClass: AppEventInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(@Inject(APP_EVENT_INTERCEPTORS) private config: Array<any>) {
        console.log(config);
        const i = config.reduceRight((next, interceptor) => {
            // console.log(next, interceptor);
            return interceptor;
        //     return interceptor.on(next);
        }, new AppEventInterceptor());

        // console.log('result', i);
    }


}
