import {Inject, NgModule} from '@angular/core';
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
    MatTableModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {IssuesService, StatusesService, TrackersService} from './services';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent
} from './components';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {IssuesEffect} from './store/effects/issues.effect';
import {StatusesEffect} from './store/effects/statuses.effect';
import {TrackersEffect} from './store/effects/trackers.effect';
import {routes} from './issues.routes';
import {APP_EVENT_INTERCEPTORS} from '../../app/providers/app.injection';


class IssuesEventInterceptor {

    public static on() {
        console.log('IssuesEventInterceptor');
    }

}


@NgModule({
    declarations: [
        IssuesMainComponent,
        IssuesListComponent,
        IssuesItemComponent
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
        // RouterModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('issues', reducers, {metaReducers}),
        EffectsModule.forFeature([IssuesEffect, StatusesEffect, TrackersEffect])
    ],
    providers: [
        IssuesService,
        StatusesService,
        TrackersService,
        {provide: APP_EVENT_INTERCEPTORS, useClass: IssuesEventInterceptor, multi: true}
    ]
})
export class IssuesModule {
    //
    // constructor(@Inject(SOME_CONFIG) private config) {
    //     console.log(config);
    // }

}
