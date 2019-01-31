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
import {IssuesService, StatusesService, TrackersService} from './services';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesJournalsComponent,
    IssuesFormComponent,
    IssuesStatusesComponent,
    IssuesTrackersComponent,
} from './components';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {
    reducers,
    metaReducers
} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {MarkdownModule} from 'ngx-markdown';
import {IssuesEffect} from './store/effects/issues.effect';
import {StatusesEffect} from './store/effects/statuses.effect';
import {TrackersEffect} from './store/effects/trackers.effect';
import {EnumerationsEffect} from './store/effects/enumerations.effect';
import {adminIssuesRoutes, projectsIssuesRoutes, routes} from './issues.routes';
import {APP_EVENT_INTERCEPTORS, APP_MODULE_SUBROUTES} from '../../app/providers/app.injection';
import {IssuesEventInterceptor} from './interceptors/issues-event.interceptor';
import {PipesModule} from '../../app/pipes';

@NgModule({
    declarations: [
        IssuesMainComponent,
        IssuesListComponent,
        IssuesItemComponent,
        IssuesJournalsComponent,
        IssuesFormComponent,
        IssuesStatusesComponent,
        IssuesTrackersComponent
    ],
    entryComponents: [
        IssuesStatusesComponent,
        IssuesTrackersComponent,
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
        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: IssuesEventInterceptor,
            multi: true,
        },
        {
            provide: APP_MODULE_SUBROUTES,
            useValue: {
                projects: projectsIssuesRoutes,
                admin: adminIssuesRoutes,
            },
            multi: true,
        }
    ],
})
export class IssuesModule {

    // public constructor(private router: Router) {
    //     console.log(router);
    // }

}
