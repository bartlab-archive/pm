import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Main404Component} from './components/404/404.component';
import {Main500Component} from './components/500/500.component';
import {MainMDEditorComponent} from './components/md-editor/md-editor.component';
import {ValidationErrorComponent} from './components/validation-error/validation-error.component';
import {DefaultComponent} from '../layouts/components';
import {BlankComponent} from '../layouts/components';
import {ListService} from './services/list.service';
import {MaterialModule} from '../material/material.module';

const mainRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [],
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
        MainMDEditorComponent,
        ValidationErrorComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(mainRoutes),
    ],
    providers: [ListService],
    exports: [
        MainMDEditorComponent,
        ValidationErrorComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class MainModule {}
