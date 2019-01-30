import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminMainComponent, AdminListComponent} from './components';
import {DefaultComponent} from '../layouts/components';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';

const routes: Routes = [{
    path: '',
    component: DefaultComponent,
    children: [
        {
            path: '',
            component: AdminMainComponent,
            data: {auth: 'admin'},
            children: [
                {path: 'admin', component: AdminListComponent},
            ],
        },
    ],
}];

@NgModule({
    declarations: [
        AdminMainComponent,
        AdminListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('moduleAdmin', reducers, {metaReducers}),
        MatCardModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule
    ],
    providers: [],
})
export class AdminModule {

}
