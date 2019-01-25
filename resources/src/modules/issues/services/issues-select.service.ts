import {Injectable} from '@angular/core';
import {createSelector, select, Store} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {selectIssuesActiveId, selectIssuesIds} from '../store/selectors/issues';
import {issuesSchema} from '../store/schemas';
import {projectsSchema} from '../store/schemas';
import {AppSelectService} from '../../../app/services/app-select.service';
import {Observable} from 'rxjs/internal/Observable';
import {Issue} from '../interfaces/issues';
import {Project} from '../interfaces/projects';

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

    public entitiesSelectors;
    public mapEntitiesToObject;

    public selectIssues;
    public selectIssue;
    public selectMyProjects;

    public issues$: Observable<Issue[]>;
    public issue$: Observable<Issue>;
    public myProjects$: Observable<Project[]>;

    public constructor(
        private store: Store<any>,
        public appSelectorsService: AppSelectService,
    ) {

        this.entitiesSelectors = this.appSelectorsService.getSelectors(this.modulesSelectors);
        this.mapEntitiesToObject = this.appSelectorsService.getMapEntitiesToObject(this.modulesSelectors);

        this.initSelectors();
    }

    public initSelectors() {

        this.selectIssues = createSelector(
            [selectIssuesIds, ...this.entitiesSelectors] as any,
            (ids, ...entities) => denormalize(ids, [issuesSchema], this.mapEntitiesToObject(...entities)),
        );

        this.selectIssue = createSelector(
            [selectIssuesActiveId, ...this.entitiesSelectors] as any,
            (id, ...entities) => denormalize(id, issuesSchema, this.mapEntitiesToObject(...entities)),
        );

        this.issues$ = this.store.pipe(select(this.selectIssues));
        this.issue$ = this.store.pipe(select(this.selectIssue));

        this.initProjectSelectors();
    }

    public initProjectSelectors() {
        const {
            selectors,
        } = this.appSelectorsService;

        if (!selectors.moduleProjects) {
            return false;
        }

        this.selectMyProjects = createSelector([selectors.moduleProjects.projects.my, ...this.entitiesSelectors] as any,
            (my, ...entities) => denormalize(my, [projectsSchema], this.mapEntitiesToObject(...entities)));

        this.myProjects$ = this.store.pipe(select(this.selectMyProjects));
    }
}
