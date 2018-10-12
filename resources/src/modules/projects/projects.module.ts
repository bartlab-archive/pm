import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
} from '@angular/material';

import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {ProjectsService} from './services/projects.service';
import {DefaultComponent} from '../layouts/components/default/default.component';
import {reducers, metaReducers} from './store/reducers';
import {ProjectsEffects} from './store/effects/projects.effects';

const authRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'projects',
                component: MainComponent,
                data: {
                    auth: 'authorized',
                },
                children: [
                    {
                        path: '',
                        component: ListComponent,
                    },
                ],
            },
        ]
    },
];

@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatMenuModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatChipsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        StoreModule.forFeature('module.projects', reducers, {metaReducers}),
        EffectsModule.forFeature([ProjectsEffects]),
    ],
    providers: [
        ProjectsService,
    ],
})
export class ProjectsModule {
}
