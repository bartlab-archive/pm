import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/components/default/default.component';
import {MatCardModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IssuesService} from './services/issues.service';
import {IssuesIndexComponent} from './components/index/index.component';

const mainRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        data: {auth: 'authorized'},
        children: [
            {path: 'issues', component: IssuesIndexComponent}
        ]
    },
];

@NgModule({
    declarations: [
        IssuesIndexComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        RouterModule.forChild(mainRoutes)
    ],
    providers: [
        IssuesService
    ],
})
export class IssuesModule {
}
