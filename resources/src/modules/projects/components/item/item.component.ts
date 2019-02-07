import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project} from '../../interfaces/projects';
import * as projectActions from '../../store/actions/projects.actions';
import {RequestStatus} from '../../../../app/interfaces/api';
import {selectProjectsActive, selectProjectsStatus, selectActiveModulesWithMapping} from '../../store/selectors/projects';
import {SharedProjectModulesReceived} from '../../store/actions/shared.actions';

@Component({
    selector: 'app-projects-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ProjectsItemComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public project$: Observable<Project> = this.store.pipe(select(selectProjectsActive));
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );

    public constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
        ) {
    }

    public load(): void {
        const {identifier} = this.activatedRoute.snapshot.params;
        this.store.dispatch(new projectActions.OneRequestAction(identifier));
    }

    public ngOnInit(): void {
        this.load();

        this.subscriptions.push(
            this.store
                .pipe(
                    select(selectActiveModulesWithMapping),
                    map((moduleItem) => {
                        if (!moduleItem) {
                            return null;
                        }
                        const {pathFromRoot: activatedRoutes}  =  this.activatedRoute;
                        const urls = activatedRoutes.map((activatedRoute) => activatedRoute.snapshot.url).filter((url) => url.length > 0);
                        return moduleItem.map((item) => ({...item, path: `/${urls.join('/')}/${item.path}`}));
                    }),
                )
                .subscribe((data) => {
                    this.store.dispatch(new SharedProjectModulesReceived(data));
                }),
        );
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new projectActions.ResetActiveIdAction());
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
