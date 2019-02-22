import {NgModule} from '@angular/core';
import {DefaultComponent, BlankComponent} from './components';
import {RouterModule, Routes} from '@angular/router';
import {LayoutsService} from './services/layouts.service';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MaterialModule} from '../material/material.module';
import {featureName, reducers} from './store/reducers';

const layoutsRoutes: Routes = [];

@NgModule({
    declarations: [DefaultComponent, BlankComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(layoutsRoutes),
        StoreModule.forFeature(featureName, reducers),
    ],
    providers: [LayoutsService],
})
export class LayoutsModule {}
