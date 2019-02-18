import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {UsersService} from './services/users.service';
import {
    UsersListComponent,
    UsersFilterComponent,
    ProfileFormComponent,
    ProfileItemComponent,
    UserStatusComponent,
    ErrorFormComponent,
} from './components';
import {UsersEffects} from './store/effects/users.effects';
import {reducers} from './store/reducers';
import {APP_MODULE_ADMIN, APP_MODULE_META} from '../../app/providers/app.injection';
import {meta} from './users.meta';
import {routes} from './users.routes';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFilterComponent,
        ProfileFormComponent,
        ProfileItemComponent,
        UserStatusComponent,
        ErrorFormComponent,
    ],
    entryComponents: [
        UsersListComponent,
        ProfileFormComponent,
        ProfileItemComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        CommonModule,
        BrowserModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('moduleUsers', reducers, {}),
        EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [
        UsersService,
        {
            provide: APP_MODULE_ADMIN,
            useValue: {
                name: 'Users',
                icon: 'person',
                url: '/users',
            },
            multi: true,
        },
        {
            provide: APP_MODULE_META,
            useValue: meta,
            multi: true,
        },
    ],
})
export class UsersModule {

    public constructor() {
    }
}
