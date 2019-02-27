import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as projectActions from '../../store/actions/projects.actions';
import * as sharedActions from '../../store/actions/shared.actions';
import {Project} from '../../interfaces/projects';
import * as fromProjects from '../../store/selectors/projects';
import {ModulesService} from '../../services/modules.service';
import {ModuleMenu} from '../../../../app/interfaces/module';

const getItemPath = (item, prefix = '/') => item.path ? `${prefix}${item.path}` : '';

@Component({
    selector: 'app-projects-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ProjectsItemComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public project$: Observable<Project> = this.store.pipe(select(fromProjects.selectProjectsActive));
    public params$: Observable<Params> = this.activatedRoute.params;
    public menus: ModuleMenu[] = [];

    public constructor(
        private modulesService: ModulesService,
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
    ) {
    }

    public load(): void {
        const {identifier} = this.activatedRoute.snapshot.params;
        this.store.dispatch(new projectActions.OneRequestAction(identifier));
    }

    public ngOnInit(): void {
        const {pathFromRoot: activatedRoutes} = this.activatedRoute;
        const urls = activatedRoutes
            .map((activatedRoute) => activatedRoute.snapshot.url)
            .filter((url) => url.length > 0);

        const setAbsolutePath = (item) => ({
            ...item,
            path: `/${urls.join('/')}${getItemPath(item)}`,
        });

        this.subscriptions.push(
            this.params$.subscribe(() => this.load()),

            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                const projectModules = this.modulesService.getProjectModules(
                    project,
                    this.modulesService.modules,
                );

                this.menus = this.modulesService
                    .getModuleMenus(projectModules)
                    .map(setAbsolutePath);

                this.store.dispatch(new sharedActions.SetTabs(this.menus));
            }),
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new projectActions.ResetActiveIdAction());
        this.store.dispatch(new sharedActions.SetTabs());
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
