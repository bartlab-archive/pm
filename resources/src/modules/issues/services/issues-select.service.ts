import {Injectable} from '@angular/core';
import {createSelector, select, Store} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {selectIssuesActiveId, selectIssuesIds} from '../store/selectors/issues';
import {selectProjectsMy} from '../store/selectors/projects';
import {issuesSchema} from '../store/schemas';
import {projectsSchema} from '../store/schemas';
import {AppSelectService} from '../../../app/services/app-select.service';
import {Observable} from 'rxjs/internal/Observable';
import {Issue} from '../interfaces/issues';

@Injectable()
export class IssuesSelectService {
    public modulesSelectors = [
        'moduleProjects.projects.entities',
        'moduleApp.users.entities',
        'moduleApp.members.entities',
        'moduleApp.roles.entities',
        'moduleIssues.issues.entities',
        'moduleIssues.statuses.entities',
        'moduleIssues.priorities.entities',
        'moduleIssues.trackers.entities',
    ];

    public selectIssues;
    public selectIssue;
    public selectProjects;

    public issues$: Observable<Issue[]>;
    public issue$: Observable<Issue>;
    public projects$: Observable<any>;

    public constructor(
        private store: Store<any>,
        public appSelectorsService: AppSelectService,
    ) {
        this.initSelectors();
    }

    public initSelectors() {
        const entitiesSelectors = this.appSelectorsService.getSelectors(this.modulesSelectors);
        const mapEntitiesToObject = this.appSelectorsService.getMapEntitiesToObject(this.modulesSelectors);

        this.selectIssues = createSelector(
            [selectIssuesIds, ...entitiesSelectors] as any,
            (ids, ...entities) => denormalize(ids, [issuesSchema], mapEntitiesToObject(...entities)),
        );

        this.selectIssue = createSelector(
            [selectIssuesActiveId, ...entitiesSelectors] as any,
            (id, ...entities) => denormalize(id, issuesSchema, mapEntitiesToObject(...entities)),
        );

        this.selectProjects = createSelector(
            [selectProjectsMy, ...entitiesSelectors] as any,
            (ids, ...entities) => denormalize(ids, [projectsSchema], mapEntitiesToObject(...entities)),
        );

        this.issues$ = this.store.pipe(select(this.selectIssues));
        this.issue$ = this.store.pipe(select(this.selectIssue));
        this.projects$ = this.store.pipe(select(this.selectProjects));

        // this.projects$.subscribe((data) => console.log(data));
    }
}
