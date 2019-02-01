import {Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/components';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesFormComponent, IssuesStatusesComponent, IssuesTrackersComponent, IssuesStatusesFormComponent
} from './components';

export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        data: {auth: 'authorized'},
        children: [
            {
                path: 'issues',
                component: IssuesMainComponent,
                children: [
                    {
                        path: '',
                        component: IssuesListComponent,
                    },
                    {
                        path: ':id',
                        component: IssuesItemComponent,
                    },
                    {
                        path: ':id/edit',
                        component: IssuesFormComponent,
                    }
                ]
            },
        ]
    },
];

export const projectsIssuesRoutes: Routes = [
    {
        path: 'issues',
        component: IssuesMainComponent,
        children: [
            {
                path: '',
                component: IssuesListComponent,
            },
        ]
    }
];

export const adminIssuesRoutes: Routes = [
    {
        path: '',
        component: IssuesMainComponent,
        children: [
            {
                path: 'issue_statuses',
                component: IssuesStatusesComponent,
            },
            {
                path: 'issue_statuses/new',
                component: IssuesStatusesFormComponent,
            },
            {
                path: 'issue_statuses/:id/edit',
                component: IssuesStatusesFormComponent,
            },
            {
                path: 'trackers',
                component: IssuesTrackersComponent,
            },
        ]
    }
];
