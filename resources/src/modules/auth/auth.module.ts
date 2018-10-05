import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule, Routes} from '@angular/router';
import {
    // ErrorStateMatcher,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatSnackBarModule,
    MatTabsModule,
    // ShowOnDirtyErrorStateMatcher
} from '@angular/material';

import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthMainComponent} from './components/main/main.component';
import {AuthService} from './services/auth.service';
import {AuthSelectService} from './services/auth-select.service';
import {AuthStorageService} from './services/auth-storage.service';
import {BlankComponent} from '../layouts/components/blank/blank.component';
import {reducers} from './store/reducers';
import {AuthEffects} from './store/effects/auth.effects';
import {httpInterceptorProviders} from './interceptors';

const authRoutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            {path: 'login', component: AuthMainComponent, data: {page: 0}},
            {path: 'account/register', component: AuthMainComponent, data: {page: 1}},
            {path: 'account/lost_password', component: AuthMainComponent, data: {page: 2}}
        ]
    }
];

@NgModule({
    declarations: [
        AuthMainComponent,
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        RouterModule.forChild(authRoutes),
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        CommonModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        AuthService,
        AuthSelectService,
        AuthStorageService,
        httpInterceptorProviders,
        // {
        //     provide: ErrorStateMatcher,
        //     useClass: ShowOnDirtyErrorStateMatcher
        // }
    ],
})
export class AuthModule {
}
