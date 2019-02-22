import {Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/components';
import {WikiItemComponent, WikiListComponent, WikiMainComponent, WikiFormComponent} from './components';

export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        data: {auth: 'authorized'},
        children: [
            {
                path: 'wiki',
                component: WikiMainComponent,
                children: [
                    {
                        path: '',
                        component: WikiListComponent,
                    },
                    {
                        path: 'create',
                        component: WikiFormComponent,
                    },
                    {
                        path: ':id',
                        component: WikiItemComponent,
                    },
                    {
                        path: ':id/edit',
                        component: WikiFormComponent,
                    },
                ],
            },
        ],
    },
];

export const projectsWikiRoutes: Routes = [
    {
        path: 'wiki',
        component: WikiMainComponent,
        children: [
            {
                path: '',
                component: WikiListComponent,
            },
        ],
    },
];
