import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {Router, Routes, RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {DefaultComponent} from '../layouts/components';
import {UsersService} from './services/users.service';
import {UsersListComponent} from './components/list/list.component';
import {UsersEffects} from './store/effects/users.effects';
import {reducers} from './store/reducers';
import {UsersFilterComponent} from './components/list/filter/filter.component';
import {ProfileFormComponent} from './components/form/form.component';
import {ProfileItemComponent} from './components/item/item.component';
import {UserStatusComponent} from './components/status/status.component';
import {ErrorFormComponent} from './components/error/error.component';
import {APP_MODULE_META} from '../../app/providers/app.injection';
import {meta} from './users.meta';

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
        RouterModule,
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
            provide: APP_MODULE_META,
            useValue: meta,
            multi: true,
        },
    ],
})
export class UsersModule {
    protected routes: Routes = [
        {
            path: '',
            component: DefaultComponent,
            children: [
                {
                    path: 'users',
                    data: {
                        auth: 'authorized',
                    },
                    children: [
                        {
                            path: '',
                            component: UsersListComponent,
                        },
                        {
                            path: ':id',
                            component: ProfileItemComponent,
                        },
                        {
                            path: ':id/edit',
                            component: ProfileFormComponent,
                        },
                    ],
                },
            ],
        },
    ];

    public constructor(protected router: Router) {
        this.router.config.unshift(...this.routes);
    }
}
