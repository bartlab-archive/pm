import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Project} from '../../interfaces/projects';
import * as fromProjects from '../../store/selectors/projects';
import * as projectActions from '../../store/actions/projects.actions';
import {AppModule} from '../../../../app/interfaces/module';
import {ModulesService} from '../../services/modules.service';

@Component({
    selector: 'app-projects-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.scss'],
})
export class ProjectsModulesComponent implements OnInit, OnDestroy {
    public project$: Observable<Project> = this.store.pipe(
        select(fromProjects.selectProjectsActive),
    );

    public project: Project = null;
    public modules: AppModule[] = [];
    public modulesForm: FormGroup;
    public subscriptions: Subscription[] = [];

    public constructor(
        private modulesService: ModulesService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private store: Store<any>,
    ) {
        this.modulesForm = this.formBuilder.group({});
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                this.project = project;
                this.modules = this.modulesService
                    .getProjectModules(project, this.modulesService.modules)
                    .filter((module) => module.optional);
            }),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }

    public onToggleModule(module) {
        module.enabled = !module.enabled;
    }

    public onSubmit() {
        const modules = this.modules.map((module) => ({
            name: module.name,
            enable: module.enabled,
        }));

        const data = {
            modules,
            identifier: this.project.identifier,
        };

        this.store.dispatch(
            new projectActions.UpdateModulesRequestAction(data),
        );
    }
}
