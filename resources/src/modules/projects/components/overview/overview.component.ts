import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project} from '../../interfaces/projects';
import {
    selectProjectsActive,
    selectProjectsStatus,
} from '../../store/selectors/projects';

import {RequestStatus} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-projects-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit {
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );
    public project$: Observable<Project> = this.store.pipe(
        select(selectProjectsActive),
    );

    public constructor(private store: Store<any>) {}

    public ngOnInit() {}
}
