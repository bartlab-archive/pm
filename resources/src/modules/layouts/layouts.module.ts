import {NgModule} from '@angular/core';
import {DefaultComponent, BlankComponent} from './components';
import {RouterModule, Routes} from '@angular/router';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
} from '@angular/material';
import {LayoutsService} from './services/layouts.service';
import {CommonModule} from '@angular/common';

const layoutsRoutes: Routes = [];

@NgModule({
    declarations: [
        DefaultComponent,
        BlankComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(layoutsRoutes),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule
    ],
    providers: [
        LayoutsService
    ],
})
export class LayoutsModule {
}
