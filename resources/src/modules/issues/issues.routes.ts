import {Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/components';
import {
    IssuesItemComponent,
    IssuesListComponent,
    IssuesMainComponent,
    IssuesFormComponent
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
                data: {inner: true}
            },
        ]
    }
];
