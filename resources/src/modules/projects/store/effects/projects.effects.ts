import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ProjectsService} from '../../services/projects.service';
import * as ProjectActions from '../actions/projects.actions';
import {ListResponse, PaginationParams} from '../../interfaces/projects';
import {ResponseError} from '../../../../app/interfaces/api';

@Injectable()
export class ProjectsEffects {
    @Effect()
    protected login$ = this.actions$.pipe(
        ofType<ProjectActions.ListRequestAction>(ProjectActions.ActionTypes.LIST_REQUEST),
        map((action) => action.payload),
        exhaustMap((data: PaginationParams) =>
            this.projectsService
                .all(data)
                .pipe(
                    map((response: ListResponse) => new ProjectActions.ListSuccessAction(response)),
                    catchError((response: ResponseError) => of(new ProjectActions.ListErrorAction(response))),
                )
        ),
    );

    public constructor(
        protected actions$: Actions,
        protected projectsService: ProjectsService,
    ) {
    }
}
