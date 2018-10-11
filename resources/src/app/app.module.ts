import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {LayoutsModule} from '../modules/layouts/layouts.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppInterceptor} from './interceptors/app.interceptor';
import {AppService} from './services/app.service';
import {FormService} from './services/form.service';

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
                // enableTracing: true, // <-- debugging purposes only
                // preloadingStrategy: SelectivePreloadingStrategy,
            }
        ),

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
        AuthModule
    ],
    providers: [
        AppService,
        FormService,
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
        {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
