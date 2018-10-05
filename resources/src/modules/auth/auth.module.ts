import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthMainComponent} from './components/main/main.component';
import {AuthService} from './services/auth.service';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from '../layouts/components/blank/blank.component';
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
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/reducers/auth.reducer';

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
        StoreModule.forFeature('auth', authReducer)
    ],
    providers: [
        AuthService
        // {
        //     provide: ErrorStateMatcher,
        //     useClass: ShowOnDirtyErrorStateMatcher
        // }
    ],
})
export class AuthModule {
}
