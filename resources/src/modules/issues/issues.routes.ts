import {Routes} from '@angular/router';

import {DefaultComponent} from '../layouts/components';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesFormComponent,
    IssuesStatusesComponent,
    IssuesTrackersComponent,
    IssuesStatusesFormComponent,
    IssuesTrackersFormComponent,
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
                        path: 'new',
                        component: IssuesFormComponent,
                    },
                    {
                        path: ':id/new',
                        component: IssuesFormComponent,
                    },
                    {
                        path: ':id',
                        component: IssuesItemComponent,
                    },
                    {
                        path: ':id/edit',
                        component: IssuesFormComponent,
                    },
                ],
            },
        ],
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
            {
                path: 'new',
                component: IssuesFormComponent,
            },
            {
                path: ':id',
                component: IssuesItemComponent,
            },
            {
                path: ':id/edit',
                component: IssuesFormComponent,
            },
        ],
    },
];

export const adminIssuesRoutes: Routes = [
    {
        path: '',
        component: IssuesMainComponent,
        children: [
            {
                path: 'issue_statuses',
                data: {auth: 'admin'},
                component: IssuesStatusesComponent,
            },
            {
                path: 'issue_statuses/new',
                data: {auth: 'admin'},
                component: IssuesStatusesFormComponent,
            },
            {
                path: 'issue_statuses/:id/edit',
                data: {auth: 'admin'},
                component: IssuesStatusesFormComponent,
            },
            {
                path: 'trackers',
                data: {auth: 'admin'},
                component: IssuesTrackersComponent,
            },
            {
                path: 'trackers/new',
                data: {auth: 'admin'},
                component: IssuesTrackersFormComponent,
            },
            {
                path: 'trackers/:id/edit',
                data: {auth: 'admin'},
                component: IssuesTrackersFormComponent,
            },
        ],
    },
];