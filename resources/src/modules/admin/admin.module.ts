import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdminMainComponent, AdminListComponent} from './components';
import {DefaultComponent} from '../layouts/components';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';
import {APP_MODULE_SUBROUTES} from '../../app/providers/app.injection';
import {findBy} from '../../app/helpers/collection';

@NgModule({
    declarations: [
        AdminMainComponent,
        AdminListComponent
    ],
    entryComponents: [
        AdminMainComponent,
        AdminListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        StoreModule.forFeature('moduleAdmin', reducers, {metaReducers}),
        MatCardModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule
    ],
    providers: [
        {
            provide: APP_MODULE_SUBROUTES,
            useValue: {
                admin: [
                    {
                        path: 'admin', component: AdminListComponent
                    }
                ]
            },
            multi: true,
        },
    ],
})
export class AdminModule {

    protected routes: Routes = [{
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: AdminMainComponent,
                data: {auth: 'admin'},
                children: findBy(this.config, 'admin'),
            },
        ],
    }];

    public constructor(
        protected router: Router,
        @Inject(APP_MODULE_SUBROUTES) private config: Array<Routes>
    ) {
        // todo: check for admin
        this.router.config.unshift(...this.routes);
        // console.log(this.config);
    }

}
