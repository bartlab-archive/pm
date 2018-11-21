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
    MatDividerModule,
} from '@angular/material';

import {ProjectsMainComponent} from './components/main/main.component';
import {ProjectsListComponent} from './components/list/list.component';
import {ProjectsItemComponent} from './components/item/item.component';
import {ProjectsService} from './services/projects.service';
import {DefaultComponent} from '../layouts/components';
import {reducers, metaReducers} from './store/reducers';
import {ProjectsEffects} from './store/effects/projects.effects';
import {projectsIssuesRoutes} from '../issues/issues.routes';

const authRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'projects',
                component: ProjectsMainComponent,
                data: {
                    auth: 'authorized',
                },
                children: [
                    {
                        path: '',
                        component: ProjectsListComponent,
                    },
                    {
                        path: ':identifier',
                        component: ProjectsItemComponent,
                        children: [
                            ...projectsIssuesRoutes,
                        ]
                    },
                ],
            },
        ],
    },
];

@NgModule({
    declarations: [
        ProjectsMainComponent,
        ProjectsListComponent,
        ProjectsItemComponent
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
        MatDividerModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        StoreModule.forFeature('module.projects', reducers, {metaReducers}),
        EffectsModule.forFeature([ProjectsEffects]),
    ],
    providers: [ProjectsService],
})
export class ProjectsModule {
}
