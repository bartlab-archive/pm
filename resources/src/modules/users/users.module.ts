import {Inject, NgModule} from '@angular/core';
import {EffectsModule} from "@ngrx/effects";
import {Router, Routes, RouterModule} from '@angular/router';
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
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

import {
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";

import {DefaultComponent} from '../layouts/components';
import {UsersService} from "./services/users.service";
import {UsersListComponent} from "./components/list/list.component";
import {UsersEffects} from "./store/effects/users.effects";
import {
    reducers,
    selectUsersEntities,
} from './store/reducers';

import {APP_MODULES_SELECTORS} from "../../app/providers/app.injection";
import {UsersFilterComponent} from "./components/list/filter/filter.component";
import {ProfileFormComponent} from "./components/form/form.component";
import {ProfileItemComponent} from "./components/item/item.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFilterComponent,
        ProfileFormComponent,
        ProfileItemComponent
    ],
    entryComponents: [
        UsersListComponent,
        ProfileFormComponent,
        ProfileItemComponent
    ],
    imports: [
        RouterModule,
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
        MatCardModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatMenuModule,
        MatButtonModule,
        MatGridListModule,
        FlexLayoutModule,
        StoreModule.forFeature('module.users', reducers, {}),
        EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [
        UsersService,
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
                        }
                    ],
                },
            ],
        },
    ];

    public constructor(protected router: Router) {
        this.router.config.unshift(...this.routes);
    }
}
