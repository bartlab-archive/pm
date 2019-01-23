import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ProjectsService} from '../../services';
import {normalize} from 'normalizr';
import {projectsSchema} from '../schemas';
import {
    MyProjectsRequestAction,
    MyProjectsSuccessAction,
    MyProjectsErrorAction,
    ProjectsActionTypes
} from '../actions/projects.action'

@Injectable()
export class ProjectsEffect {
    @Effect()
    protected my$ = this.actions$.pipe(
        ofType<MyProjectsRequestAction>(ProjectsActionTypes.MY_PROJECTS_REQUEST),
        exhaustMap(() => this.projectsService.getProjects().pipe(
            map((response: any) => {
                const payload = {
                    ...normalize(response.data, [projectsSchema]),
                };
                return new MyProjectsSuccessAction(payload);

            }),
            catchError((response) => of(new MyProjectsErrorAction(response)))
        ))
    );

    public constructor(
        protected actions$: Actions,
        protected projectsService: ProjectsService
    ) {

    }
}