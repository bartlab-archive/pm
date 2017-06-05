import 'angular';

import usersConfig from './users.config';
import usersListComponent from './list/users-list.component';
import usersEditComponent from './edit/users-edit.component';
import usersInfoComponent from './info/users-info.component';

angular.module('app.components.users', [])
    .config(usersConfig)
    .component('usersListComponent', usersListComponent)
    .component('usersEditComponent', usersEditComponent)
    .component('usersInfoComponent', usersInfoComponent);