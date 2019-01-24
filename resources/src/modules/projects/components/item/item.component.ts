import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project} from '../../interfaces/projects';
import * as projectActions from '../../store/actions/projects.actions';
import {RequestStatus} from '../../../../app/interfaces/api';
import {selectProjectsActive, selectProjectsStatus} from '../../store/selectors/projects';

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

    public constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<any>) {
    }

    public load(): void {
        const {identifier} = this.activatedRoute.snapshot.params;
        this.store.dispatch(new projectActions.OneRequestAction(identifier));
    }

    public ngOnInit(): void {
        this.load();

        this.subscriptions.push();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.store.dispatch(new projectActions.ResetActiveIdAction());
    }
}
