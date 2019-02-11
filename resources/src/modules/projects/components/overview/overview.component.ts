import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../interfaces/projects';
import { select, Store } from '@ngrx/store';
import { selectProjectsActive } from '../../store/selectors/projects';

@Component({
    selector: 'app-projects-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit {
    public project$: Observable<Project> = this.store.pipe(select(selectProjectsActive));

    public constructor(private store: Store<any>) {
    }

    public ngOnInit() {

    }
}
