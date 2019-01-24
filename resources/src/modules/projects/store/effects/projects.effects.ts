import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {normalize} from 'normalizr';
import {ProjectsService} from '../../services/projects.service';
import * as ProjectActions from '../actions/projects.actions';
import {ListResponse, PaginationParams, ProjectResponse} from '../../interfaces/projects';
import {ResponseError} from '../../../../app/interfaces/api';
import {projectsSchema} from '../schemas';

@Injectable()
export class ProjectsEffects {
    @Effect()
    protected list$ = this.actions$.pipe(
        ofType<ProjectActions.ListRequestAction>(ProjectActions.ActionTypes.LIST_REQUEST),
        // delay(3000),
        map((action) => action.payload),
        exhaustMap((data: PaginationParams) =>
            this.projectsService.all(data).pipe(
                map((response: ListResponse) => {
                    const payload = {
                        meta: response.meta,
                        ...normalize(response.data, [projectsSchema]),
                    };
                    return new ProjectActions.ListSuccessAction(payload);
                }),
                catchError((response: ResponseError) => of(new ProjectActions.ListErrorAction(response))),
            ),
        ),
    );

    @Effect()
    protected one$ = this.actions$.pipe(
        ofType<ProjectActions.OneRequestAction>(ProjectActions.ActionTypes.ONE_REQUEST),
        // delay(3000),
        map((action) => action.payload),
        exhaustMap((identifier: string) =>
            this.projectsService.one(identifier).pipe(
                map((response: ProjectResponse) => {
                    const payload = {
                        ...normalize(response.data, projectsSchema),
                    };
                    return new ProjectActions.OneSuccessAction(payload)
                }),
                catchError((response: ResponseError) => of(new ProjectActions.OneErrorAction(response))),
            ),
        ),
    );

    public constructor(protected actions$: Actions, protected projectsService: ProjectsService) {
    }
}
