import {Inject, NgModule} from '@angular/core';
import {EffectsModule} from "@ngrx/effects";
import {Router, RouterModule, Routes} from '@angular/router';


import {DefaultComponent} from '../layouts/components';
import {UserService} from "./services/user.service";
import {UsersListComponent} from "./components/list/list.component";
import {USERS_ROUTERS} from "./providers/users.injection";
import {UsersEffects} from "./store/effects/users.effects";

import {
    reducers,
} from './store/reducers';
import {StoreModule} from "@ngrx/store";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        UsersListComponent
    ],
    entryComponents: [
        UsersListComponent
    ],
    imports: [
        HttpClientModule,
        StoreModule.forFeature('module.users', reducers, {}),
        EffectsModule.forFeature([UsersEffects]),
    ],
    providers: [
        UserService,
        {
            provide: USERS_ROUTERS,
            useValue: [],
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
        // this.router.config.push(config);
    }
}
