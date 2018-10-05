import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers, metaReducers} from '../store/reducers';
import {AppComponent} from './app.component';
import {MainModule} from '../modules/main/main.module';
import {AuthModule} from '../modules/auth/auth.module';
import {LayoutsModule} from '../modules/layouts/layouts.module';

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
                {path: '', redirectTo: '/index', pathMatch: 'full'},
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
            name: 'NgRx App',
            maxAge: 25, // Retains last 25 states
        }),

        // modules
        MainModule,
        AuthModule,
        LayoutsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
