import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {AppComponent} from './app.component';

import {MainModule} from '../modules/main/main.module';
import {AuthModule} from '../modules/auth/auth.module';
import {LayoutsModule} from '../modules/layouts/layouts.module';
// import {authReducer} from '../modules/auth/store/reducers/auth.reducer';

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
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
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
