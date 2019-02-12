import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {selectProjectsStatus} from '../../store/selectors/projects';
import {map} from 'rxjs/operators';
import {RequestStatus} from '../../../../app/interfaces/api';

interface SettingsTab {
    label: string;
    path: string;
}

@Component({
    selector: 'app-projects-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class ProjectsSettingsComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    public pending$: Observable<boolean> = this.store.pipe(
        select(selectProjectsStatus),
        map((status) => status === RequestStatus.pending),
    );

    public projectsLinks: SettingsTab[] = [
        {
            label: 'Information',
            path: '/information',
        },

        {
            label: 'Modules',
            path: '/modules',
        },
    ];

    public navLinks: SettingsTab[] = [];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<any>,
    ) {}

    public getActivatedPath() {
        const {pathFromRoot: activatedRoutes} = this.activatedRoute;
        const urls = activatedRoutes
            .map((activatedRoute) => activatedRoute.snapshot.url)
            .filter((url) => url.length > 0);

        return `/${urls.join('/')}`;
    }

    public ngOnInit(): void {
        const activatedPath = this.getActivatedPath();
        this.navLinks = this.projectsLinks.map((projectsLink) => ({
            ...projectsLink,
            path: `${activatedPath}/${projectsLink.path}`,
        }));

        this.subscriptions.push();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }
}
