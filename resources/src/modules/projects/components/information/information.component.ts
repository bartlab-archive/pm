import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {selectProjectsStatus} from '../../store/selectors/projects';
import {RequestStatus} from '../../../../app/interfaces/api';
import * as fromProjects from '../../store/selectors/projects';
import * as projectActions from '../../store/actions/projects.actions';
import {Project} from '../../interfaces/projects';

@Component({
    selector: 'app-projects-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss'],
})
export class ProjectsInformationComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );

    public project$: Observable<Project> = this.store.pipe(select(fromProjects.selectProjectsActive));
    public projects$: Observable<Project[]>;
    public informationForm: FormGroup;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
        private formBuilder: FormBuilder,
    ) {
        this.informationForm = this.formBuilder.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            description: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            identifier: [
                {value: null, disabled: true},
                Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
            ],

            homepage: [null, Validators.compose([Validators.minLength(3)])],
            isPublic: [false],
            subproject: [null, Validators.compose([])],
            inheritMembers: [{value: false, disabled: true}],
        });

        const isActive = (project) => (item) => project && project.identifier === item.identifier;
        const notActive = (project) => (item) => !isActive(project)(item);

        this.projects$ = this.store.pipe(
            select(fromProjects.selectProjects),
            withLatestFrom(this.project$),
            map(([projects, project]) => projects.filter(notActive(project))),
        );
    }

    public load(): void {
        const {pathFromRoot: activatedRoutes} = this.activatedRoute;
        const params = activatedRoutes
            .map((activatedRoute) => activatedRoute.snapshot.params)
            .filter((params) => Object.keys(params).length > 0)
            .reduce((acc, params) => ({...acc, params}), {});

        if (params.identifier) {
            this.store.dispatch(new projectActions.OneRequestAction(params.identifier));
        }
    }

    public ngOnInit(): void {
        // this.store.dispatch(new projectActions.ListRequestAction({page: 0, per_page: 500}));
        this.subscriptions.push(
            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                this.informationForm.controls.name.setValue(project.name);
                this.informationForm.controls.description.setValue(project.description);
                this.informationForm.controls.identifier.setValue(project.identifier);
                this.informationForm.controls.homepage.setValue(project.homepage);
                this.informationForm.controls.isPublic.setValue(project.is_public);
            }),
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public getNameError() {
        const field = this.informationForm.get('name');
        if (field.hasError('required')) {
            return 'Name cannot be blank';
        }

        return '';
    }

    public getDescriptionError() {
        const field = this.informationForm.get('description');
        if (field.hasError('required')) {
            return 'Description cannot be blank';
        }

        return '';
    }

    public getIdentifierError() {
        const field = this.informationForm.get('identifier');
        if (field.hasError('required')) {
            return 'Identifier cannot be blank';
        }

        return '';
    }

    public getHomepageError() {
        const field = this.informationForm.get('homepage');
        if (field.hasError('required')) {
            return 'Homepage cannot be blank';
        }

        return '';
    }

    public getSubprojectError() {
        const field = this.informationForm.get('name');
        if (field.hasError('required')) {
            return 'Subproject cannot be blank';
        }

        return '';
    }

    public onSubprojectChange($event: any) {
        console.log($event);
    }

    public onSubmit($event: any) {
        console.log(this.informationForm);
    }
}
