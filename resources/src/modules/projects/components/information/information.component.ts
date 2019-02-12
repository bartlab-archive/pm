import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import * as fromProjects from '../../store/selectors/projects';
import * as projectActions from '../../store/actions/projects.actions';
import {Project} from '../../interfaces/projects';
import {ResponseError} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-projects-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss'],
})
export class ProjectsInformationComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public error$: Observable<ResponseError> = this.store.pipe(
        select(fromProjects.selectProjectsError),
    );

    public project$: Observable<Project> = this.store.pipe(
        select(fromProjects.selectProjectsActive),
    );

    public projects$: Observable<Project[]>;
    public informationForm: FormGroup;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
        private formBuilder: FormBuilder,
    ) {
        this.informationForm = this.formBuilder.group({
            name: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],

            description: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(255),
                ]),
            ],

            identifier: [
                {value: null, disabled: true},
                Validators.compose([
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                ]),
            ],

            homepage: [null, Validators.compose([Validators.minLength(3)])],
            is_public: [false],
            subproject: [null, Validators.compose([])],
            inherit_members: [{value: false, disabled: true}],
        });

        const isActive = (project) => (item) =>
            project && project.identifier === item.identifier;

        const notActive = (project) => (item) => !isActive(project)(item);

        this.projects$ = this.store.pipe(
            select(fromProjects.selectProjects),
            withLatestFrom(this.project$),
            map(([projects, project]) => projects.filter(notActive(project))),
        );
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.error$.pipe(filter(Boolean)).subscribe((responseError) => {
                if (responseError.error) {
                    const {errors} = responseError.error;
                    Object.keys(errors).forEach((name) => {
                        this.informationForm.get(name).setErrors({
                            custom: errors[name][0],
                        });
                    });
                }
            }),

            this.project$.pipe(filter(Boolean)).subscribe((project) => {
                const {
                    name = null,
                    description = null,
                    identifier = null,
                    homepage = null,
                    subproject = null,
                    is_public = null,
                    inherit_members = null,
                } = project;

                this.informationForm.setValue({
                    name,
                    description,
                    identifier,
                    homepage,
                    subproject,
                    is_public,
                    inherit_members,
                });
            }),
        );

        setTimeout(() => {
            this.store.dispatch(
                new projectActions.ListRequestAction({page: 0, per_page: 500}),
            );
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }

    public onSubprojectChange($event: any) {
        const field = this.informationForm.get('inherit_members');
        if ($event.value) {
            field.enable();
        } else {
            field.disable();
        }
    }

    public onSubmit() {
        if (this.informationForm.valid) {
            this.store.dispatch(
                new projectActions.UpdateRequestAction({
                    identifier: this.informationForm.get('identifier').value,
                    ...this.informationForm.value,
                }),
            );
        }
    }
}
