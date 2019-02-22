import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {selectProjectsStatus} from '../../store/selectors/projects';
import {filter, map, mapTo} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';
import {ModulesService} from '../../services/modules.service';
import {Project} from '../../interfaces/projects';
import * as fromProjects from '../../store/selectors/projects';
import {ModuleSettings} from '../../../../app/interfaces/module';

@Component({
    selector: 'app-projects-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class ProjectsSettingsComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public project$: Observable<Project> = this.store.pipe(
        select(fromProjects.selectProjectsActive),
    );

    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
        // mapTo(true),
    );

    public navLinks: ModuleSettings[] = [];

    public constructor(
        private modulesService: ModulesService,
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
    ) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                const projectModules = this.modulesService.getProjectModules(
                    project,
                    this.modulesService.modules,
                );

                this.navLinks = this.modulesService.getModuleSettings(
                    projectModules,
                );
            }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }
}
