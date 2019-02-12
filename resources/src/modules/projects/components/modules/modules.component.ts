import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Project} from '../../interfaces/projects';
import * as fromProjects from '../../store/selectors/projects';
import {FormBuilder, FormGroup} from '@angular/forms';
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

    public modulesForm: FormGroup;
    public subscriptions: Subscription[] = [];
    public modules = [];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private modulesService: ModulesService,
        private store: Store<any>,
    ) {
        this.modulesForm = this.formBuilder.group({});
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                this.modules = this.modulesService.getProjectModules(project);
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
        console.log(this.modules);
    }
}
