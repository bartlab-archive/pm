import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
} from '@angular/material';

import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IssuesService, StatusesService, TrackersService, IssuesSelectService} from './services';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesJournalsComponent,
    IssuesFormComponent
} from './components';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {
    reducers,
    metaReducers,
    selectIssuesEntities,
    selectStatusesEntities,
    selectTrackersEntities,
    selectPrioritiesEntities,
} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {MarkdownModule} from 'ngx-markdown';
import {IssuesEffect} from './store/effects/issues.effect';
import {StatusesEffect} from './store/effects/statuses.effect';
import {TrackersEffect} from './store/effects/trackers.effect';
import {EnumerationsEffect} from './store/effects/enumerations.effect';
import {projectsIssuesRoutes, routes} from './issues.routes';
import {APP_EVENT_INTERCEPTORS, APP_MODULES_SELECTORS} from '../../app/providers/app.injection';
import {IssuesEventInterceptor} from './interceptors/issues-event.interceptor';
import {PROJECTS_ROUTERS} from '../projects/providers/projects.injection';
import {PipesModule} from '../../app/pipes';

@NgModule({
    declarations: [
        IssuesMainComponent,
        IssuesListComponent,
        IssuesItemComponent,
        IssuesJournalsComponent,
        IssuesFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatCheckboxModule,
        FlexLayoutModule,
        MatCardModule,
        MatChipsModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // RouterModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('moduleIssues', reducers, {metaReducers}),
        EffectsModule.forFeature([
            IssuesEffect,
            StatusesEffect,
            TrackersEffect,
            EnumerationsEffect
        ]),
        MarkdownModule.forChild(),
        PipesModule,
    ],

    providers: [
        IssuesService,
        StatusesService,
        TrackersService,
        IssuesSelectService,
        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: IssuesEventInterceptor,
            multi: true,
        },
        {
            provide: PROJECTS_ROUTERS,
            useValue: projectsIssuesRoutes,
            multi: true,
        },
        {
            provide: APP_MODULES_SELECTORS,
            useValue: {
                moduleIssues: {
                    issues: {
                        entities: selectIssuesEntities,
                    },

                    statuses: {
                        entities: selectStatusesEntities,
                    },

                    trackers: {
                        entities: selectTrackersEntities,
                    },

                    priorities: {
                        entities: selectPrioritiesEntities,
                    },
                }
            },
            multi: true,
        },
    ],
})
export class IssuesModule {

    // public constructor(private router: Router) {
    //     console.log(router);
    // }

}
