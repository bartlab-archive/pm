import {Injectable} from '@angular/core';
import {createSelector, select, Store} from '@ngrx/store';
import {denormalize} from 'normalizr';
import {selectIssuesActiveId, selectIssuesIds} from '../store/selectors/issues';
import {issuesSchema} from '../store/schemas';
import {AppSelectService} from '../../../app/services/app-select.service';
import {Observable} from 'rxjs/internal/Observable';
import {Issue} from '../interfaces/issues';

@Injectable()
export class IssuesSelectService {
    public modulesSelectors = [
        'moduleProjects.projects.entities',
        'moduleProjects.users.entities',
        'moduleProjects.members.entities',
        'moduleProjects.roles.entities',
        'moduleIssues.issues.entities',
        'moduleIssues.statuses.entities',
        'moduleIssues.priorities.entities',
        'moduleIssues.trackers.entities',
    ];

    public selectIssues;
    public selectIssue;

    public issues$: Observable<Issue[]>;
    public issue$: Observable<Issue>;

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

        this.issues$ = this.store.pipe(select(this.selectIssues));

        this.issue$ = this.store.pipe(select(this.selectIssue));
    }
}
