import {NgModule} from '@angular/core';
import {DefaultComponent} from './components/default/default.component';
import {BlankComponent} from './components/blank/blank.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule, MatMenuModule
} from '@angular/material';

const layoutsRoutes: Routes = [
    // { path: '',  component: DefaultComponent },
    // { path: '', component: BlankComponent }
];

@NgModule({
    declarations: [
        DefaultComponent,
        BlankComponent
    ],
    imports: [
        RouterModule.forChild(layoutsRoutes),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule
    ],
    providers: [],
})
export class LayoutsModule {
}
