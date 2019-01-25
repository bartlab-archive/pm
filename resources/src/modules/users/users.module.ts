import {Inject, NgModule} from '@angular/core';
import {EffectsModule} from "@ngrx/effects";
import {Router, Routes} from '@angular/router';
import {StoreModule} from "@ngrx/store";
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";

import {DefaultComponent} from '../layouts/components';
import {UsersService} from "./services/users.service";
import {UsersListComponent} from "./components/list/list.component";
import {USERS_ROUTERS} from "./providers/users.injection";
import {UsersEffects} from "./store/effects/users.effects";
import {
    reducers,
    selectUsersEntities,
} from './store/reducers';

import {APP_MODULES_SELECTORS} from "../../app/providers/app.injection";
import {UsersFilterComponent} from "./components/list/filter/filter.component";

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFilterComponent
    ],
    entryComponents: [
        UsersListComponent
    ],
    imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatChipsModule,
        MatIconModule,
        HttpClientModule,
        CommonModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        StoreModule.forFeature('module.users', reducers, {}),
        EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [
        UsersService,
        {
            provide: USERS_ROUTERS,
            useValue: [],
            multi: true,
        },
        {
            provide: APP_MODULES_SELECTORS,
            useValue: {
                moduleUsers: {
                    users: {
                        entities: selectUsersEntities,
                    },

                }
            },
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
                    component: UsersListComponent,
                    data: {
                        auth: 'authorized',
                    },
                    children: [
                        {
                            path: '',
                            component: UsersListComponent,
                        },
                        {
                            path: ':identifier',
                            component: UsersListComponent,
                        },
                    ],
                },
            ],
        },
    ];

    public constructor(protected router: Router, @Inject(USERS_ROUTERS) private config: Array<any>) {
        this.router.config.unshift(...this.routes);
    }
}
