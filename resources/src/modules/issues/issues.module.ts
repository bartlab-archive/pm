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
    MatTooltipModule
} from '@angular/material';

import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IssuesService, StatusesService, TrackersService} from './services';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesJournalsComponent
} from './components';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {MarkdownModule} from 'ngx-markdown';
import {IssuesEffect} from './store/effects/issues.effect';
import {StatusesEffect} from './store/effects/statuses.effect';
import {TrackersEffect} from './store/effects/trackers.effect';
import {projectsIssuesRoutes, routes} from './issues.routes';
import {APP_EVENT_INTERCEPTORS} from '../../app/providers/app.injection';
import {IssuesEventInterceptor} from './interceptors/issues-event.interceptor';
import {PROJECTS_ROUTERS} from '../projects/providers/projects.injection';

@NgModule({
    declarations: [
        IssuesMainComponent,
        IssuesListComponent,
        IssuesItemComponent,
        IssuesJournalsComponent
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
        // RouterModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('module.issues', reducers, {metaReducers}),
        EffectsModule.forFeature([IssuesEffect, StatusesEffect, TrackersEffect]),
        MarkdownModule.forChild(),
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
            provide: PROJECTS_ROUTERS,
            useValue: projectsIssuesRoutes,
            multi: true,
        }
    ],
})
export class IssuesModule {

    // public constructor(private router: Router) {
    //     console.log(router);
    // }

}
