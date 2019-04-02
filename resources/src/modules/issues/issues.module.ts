import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReactiveFormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';

import {IssuesService, StatusesService, TrackersService} from './services';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesJournalsComponent,
    IssuesFormComponent,
    IssuesStatusesComponent,
    IssuesTrackersComponent,
    IssuesStatusesFormComponent,
    IssuesTrackersFormComponent
} from './components';
import {MaterialModule} from '../material/material.module';
import {reducers, metaReducers} from './store/reducers';
import {IssuesEffect} from './store/effects/issues.effect';
import {StatusesEffect} from './store/effects/statuses.effect';
import {TrackersEffect} from './store/effects/trackers.effect';
import {EnumerationsEffect} from './store/effects/enumerations.effect';
import {
    adminIssuesRoutes,
    projectsIssuesRoutes,
    routes
} from './issues.routes';
import {
    APP_EVENT_INTERCEPTORS,
    APP_MODULE_ADMIN,
    APP_MODULE_META,
    APP_MODULE_SUBROUTES,
} from '../../app/providers/app.injection';
import {IssuesEventInterceptor} from './interceptors/issues-event.interceptor';
import {PipesModule} from '../../app/pipes';
import {meta} from './issues.meta';
import {SharedLayoutsAddLeftItem} from './store/actions/shared.action';
import {MainModule} from '../main/main.module';

@NgModule({
    declarations: [
        IssuesMainComponent,
        IssuesListComponent,
        IssuesItemComponent,
        IssuesJournalsComponent,
        IssuesFormComponent,
        IssuesStatusesComponent,
        IssuesTrackersComponent,
        IssuesStatusesFormComponent,
        IssuesTrackersFormComponent,
    ],
    entryComponents: [
        IssuesStatusesComponent,
        IssuesTrackersComponent,
        IssuesStatusesFormComponent,
        IssuesTrackersFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        // RouterModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('moduleIssues', reducers, {metaReducers}),
        EffectsModule.forFeature([
            IssuesEffect,
            StatusesEffect,
            TrackersEffect,
            EnumerationsEffect,
        ]),
        MarkdownModule.forChild(),
        PipesModule,
        MainModule
    ],

    providers: [
        IssuesService,
        StatusesService,
        TrackersService,
        {
            provide: APP_MODULE_ADMIN,
            useValue: {
                name: 'Trackers',
                icon: 'timelapse',
                url: '/trackers',
            },
            multi: true,
        },
        {
            provide: APP_MODULE_ADMIN,
            useValue: {
                name: 'Issues statuses',
                icon: 'done',
                url: '/issue_statuses',
            },
            multi: true,
        },
        {
            provide: APP_MODULE_META,
            useValue: meta,
            multi: true,
        },
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
        },
    ],
})
export class IssuesModule {

    public constructor(
        protected store: Store<any>,
    ) {
        this.store.dispatch(new SharedLayoutsAddLeftItem(
            {
                url: '/issues',
                icon: 'list',
                name: 'View all issues',
            },
        ));
    }

}
