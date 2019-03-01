import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {select, Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {Router, RouterModule, Routes} from '@angular/router';
import {ProjectsMainComponent} from './components/main/main.component';
import {ProjectsListComponent} from './components/list/list.component';
import {ProjectsItemComponent} from './components/item/item.component';
import {ProjectsService} from './services/projects.service';
import {ModulesService} from './services/modules.service';
import {DefaultComponent} from '../layouts/components';
import {reducers, metaReducers, selectProjectsMy} from './store/reducers';
import {MainModule} from '../main/main.module';
import {MaterialModule} from '../material/material.module';
import {ProjectsEffects} from './store/effects/projects.effects';
import {
    APP_EVENT_INTERCEPTORS, APP_MODULE_ADMIN,
    APP_MODULE_META,
    APP_MODULE_SUBROUTES,
} from '../../app/providers/app.injection';
import {ProjectsEventInterceptor} from './interceptors/projects-event.interceptor';
import {findBy} from '../../app/helpers/collection';
import {ProjectsOverviewComponent} from './components/overview/overview.component';
import {ProjectsSettingsComponent} from './components/settings/settings.component';
import {ProjectsInformationComponent} from './components/information/information.component';
import {ProjectsModulesComponent} from './components/modules/modules.component';
import {meta} from './projects.meta';
import {Observable} from 'rxjs';
import {selectTopItems} from '../layouts/store/selectors/menus.selector';
import {filter, first, last, skip} from 'rxjs/operators';
import {AddLeftItem, SetRightItems} from './store/actions/shared.actions';
import {selectProjectsMyList} from './store/selectors/projects';

@NgModule({
    declarations: [
        ProjectsMainComponent,
        ProjectsListComponent,
        ProjectsItemComponent,
        ProjectsOverviewComponent,
        ProjectsSettingsComponent,
        ProjectsInformationComponent,
        ProjectsModulesComponent,
    ],
    entryComponents: [
        ProjectsMainComponent,
        ProjectsListComponent,
        ProjectsItemComponent,
        ProjectsOverviewComponent,
        ProjectsSettingsComponent,
        ProjectsInformationComponent,
        ProjectsModulesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MainModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forFeature('moduleProjects', reducers, {metaReducers}),
        EffectsModule.forFeature([ProjectsEffects]),
    ],
    providers: [
        ProjectsService,
        ModulesService,
        {
            provide: APP_MODULE_ADMIN,
            useValue: {
                name: 'Projects',
                icon: 'work',
                url: 'projects',
            },
            multi: true,
        },
        {
            provide: APP_MODULE_META,
            useValue: meta,
            multi: true,
        },
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
                            children: [
                                {
                                    path: '',
                                    component: ProjectsOverviewComponent,
                                },
                                {
                                    path: 'settings',
                                    component: ProjectsSettingsComponent,
                                    children: [
                                        {
                                            path: '',
                                            redirectTo: 'information',
                                        },

                                        {
                                            path: 'information',
                                            component: ProjectsInformationComponent,
                                        },
                                        {
                                            path: 'modules',
                                            component: ProjectsModulesComponent,
                                        },
                                    ],
                                },
                            ].concat(findBy(this.config, 'projects')),
                        },
                    ],
                },
            ],
        },
    ];

    protected my$: Observable<Array<any>> = this.store.pipe(
        select(selectProjectsMyList),
        filter(Boolean),
        skip(2),
    );

    public constructor(
        protected router: Router,
        protected store: Store<any>,
        @Inject(APP_MODULE_SUBROUTES) private config: Array<Routes>,
    ) {
        this.router.config.unshift(...this.routes);

        this.store.dispatch(new AddLeftItem(
            {
                url: ['/projects'],
                icon: 'work',
                name: 'Projects',
            },
        ));

        this.my$.subscribe((items) => {
            this.store.dispatch(new SetRightItems(items.map((project) => {
                return {
                    icon: 'work',
                    path: ['/projects', project.identifier],
                    title: project.name,
                };
            })));
        });
    }
}
