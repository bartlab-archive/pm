import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdminMainComponent, AdminListComponent} from './components';
import {DefaultComponent} from '../layouts/components';
import {MaterialModule} from '../material/material.module';
import {APP_MODULE_SUBROUTES} from '../../app/providers/app.injection';
import {findBy} from '../../app/helpers/collection';
import {SharedLayoutsAddLeftItem} from './store/actions/shared.action';
import {Store} from '@ngrx/store';

@NgModule({
    declarations: [AdminMainComponent, AdminListComponent],
    entryComponents: [AdminMainComponent, AdminListComponent],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
    ],
    providers: [
        {
            provide: APP_MODULE_SUBROUTES,
            useValue: {
                admin: [
                    {
                        path: 'admin',
                        data: {auth: 'admin'},
                        component: AdminListComponent,
                    },
                ],
            },
            multi: true,
        },
    ],
})
export class AdminModule {
    protected routes: Routes = [
        {
            path: '',
            component: DefaultComponent,
            children: [
                {
                    path: '',
                    component: AdminMainComponent,
                    children: findBy(this.config, 'admin'),
                },
            ],
        },
    ];

    public constructor(
        protected router: Router,
        protected store: Store<any>,
        @Inject(APP_MODULE_SUBROUTES) private config: Array<Routes>,
    ) {
        // todo: check for admin
        this.router.config.unshift(...this.routes);

        // todo: check for admin
        this.store.dispatch(new SharedLayoutsAddLeftItem(
            {
                url: '/admin',
                icon: 'settings_applications',
                name: 'Administrator',
            },
        ));
    }
}
