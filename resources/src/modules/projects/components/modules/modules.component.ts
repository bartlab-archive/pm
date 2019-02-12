import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {selectProjectsStatus} from '../../store/selectors/projects';
import {map} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-projects-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.scss'],
})
export class ProjectsModulesComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );

    public constructor(private activatedRoute: ActivatedRoute, private store: Store<any>) {}

    public ngOnInit(): void {
        this.subscriptions.push();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
