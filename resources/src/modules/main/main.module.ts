import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormControlName} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Main404Component} from './components/404/404.component';
import {Main500Component} from './components/500/500.component';
import {MainIndexComponent} from './components/index/index.component';
import {MainMDEComponent} from './components/mde/mde.component';
import {MDEDirective} from './directives';
import {DefaultComponent} from '../layouts/components';
import {BlankComponent} from '../layouts/components';
import {ListService} from './services/list.service';
import {MaterialModule} from '../material/material.module';

const mainRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: MainIndexComponent,
                data: {auth: 'authorized'},
            },
        ],
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {path: '404', component: Main404Component},
            {path: '500', component: Main500Component},
        ],
    },
];

@NgModule({
    declarations: [
        Main404Component,
        Main500Component,
        MainIndexComponent,
        MainMDEComponent,
        MDEDirective,
    ],
    entryComponents: [MainMDEComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(mainRoutes),
    ],
    providers: [FormControlName, ListService],
    exports: [MDEDirective, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
