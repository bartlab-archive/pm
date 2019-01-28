import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminMainComponent} from './components';

const routes: Routes = [];

@NgModule({
    declarations: [
        AdminMainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class AdminhModule {

}
