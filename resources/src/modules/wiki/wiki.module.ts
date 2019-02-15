import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {WikiService} from './services';
import {
    WikiItemComponent,
    WikiListComponent,
    WikiMainComponent,
    WikiFormComponent,
} from './components';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MarkdownModule} from 'ngx-markdown';
import {reducers, metaReducers} from './store/reducers';
import {WikiEffects} from './store/effects/wiki.effects';
import {projectsWikiRoutes, routes} from './wiki.routes';
import {
    APP_EVENT_INTERCEPTORS,
    APP_MODULE_META,
    APP_MODULE_SUBROUTES,
} from '../../app/providers/app.injection';
import {WikiEventInterceptor} from './interceptors/wiki-event.interceptor';
import {PipesModule} from '../../app/pipes';
import {MainModule} from '../main/main.module';
import {MaterialModule} from '../material/material.module';
import {meta} from './wiki.meta';

@NgModule({
    declarations: [
        WikiMainComponent,
        WikiListComponent,
        WikiItemComponent,
        WikiFormComponent,
    ],
    imports: [
        CommonModule,
        MainModule,
        MaterialModule,
        ReactiveFormsModule,
        // RouterModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('moduleWiki', reducers, {metaReducers}),
        EffectsModule.forFeature([WikiEffects]),
        MarkdownModule.forChild(),
        PipesModule,
    ],

    providers: [
        WikiService,
        {
            provide: APP_MODULE_META,
            useValue: meta,
            multi: true,
        },

        {
            provide: APP_EVENT_INTERCEPTORS,
            useClass: WikiEventInterceptor,
            multi: true,
        },

        {
            provide: APP_MODULE_SUBROUTES,
            useValue: {
                projects: projectsWikiRoutes,
            },
            multi: true,
        },
    ],
})
export class WikiModule {}
