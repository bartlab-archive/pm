import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {Router, RouterModule, Routes} from '@angular/router';
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
import {
    reducers,
    metaReducers,
} from './store/reducers';

import {ProjectsEffects} from './store/effects/projects.effects';
import {APP_EVENT_INTERCEPTORS, APP_MODULE_SUBROUTES} from '../../app/providers/app.injection';
import {ProjectsEventInterceptor} from './interceptors/projects-event.interceptor';
import {findBy} from '../../app/helpers/collection';

@NgModule({
    declarations: [
        ProjectsMainComponent,
        ProjectsListComponent,
        ProjectsItemComponent
    ],
    entryComponents: [
        ProjectsMainComponent,
        ProjectsListComponent,
        ProjectsItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        // RouterModule.forChild(authRoutes),
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
        StoreModule.forFeature('moduleProjects', reducers, {metaReducers}),
        EffectsModule.forFeature([ProjectsEffects]),
    ],
    providers: [
        ProjectsService,
        {
            provide: APP_MODULE_SUBROUTES,
            useValue: [],
            multi: true,
        },
        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: ProjectsEventInterceptor,
            multi: true,
        },
    ],
})
export class ProjectsModule {

    protected routes: Routes = [
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
                            children: findBy(this.config, 'projects')
                        },
                    ],
                },
            ],
        },
    ];

    public constructor(
        protected router: Router,
        @Inject(APP_MODULE_SUBROUTES) private config: Array<Routes>
    ) {
        this.router.config.unshift(...this.routes);
        // this.router.config.push(config);
    }
}
