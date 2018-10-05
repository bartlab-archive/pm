import {NgModule} from '@angular/core';
import {Main404Component} from './components/404/404.component';
import {Main500Component} from './components/500/500.component';
import {MainIndexComponent} from './components/index/index.component';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/components/default/default.component';
import {BlankComponent} from '../layouts/components/blank/blank.component';

const mainRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {path: 'index', component: MainIndexComponent}
        ]
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {path: '404', component: Main404Component},
            {path: '500', component: Main500Component}
        ]
    }
];

@NgModule({
    declarations: [
        Main404Component,
        Main500Component,
        MainIndexComponent
    ],
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    providers: [],
})
export class MainModule {
}
