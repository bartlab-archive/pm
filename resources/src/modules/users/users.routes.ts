import {DefaultComponent} from '../layouts/components';
import {UsersListComponent} from './components/list/list.component';
import {ProfileItemComponent} from './components/item/item.component';
import {ProfileFormComponent} from './components/form/form.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'users',
                data: {
                    auth: 'authorized',
                },
                children: [
                    {
                        path: '',
                        component: UsersListComponent,
                    },
                    {
                        path: ':id',
                        component: ProfileItemComponent,
                    },
                    {
                        path: ':id/edit',
                        component: ProfileFormComponent,
                    },
                ],
            },
        ],
    },
];