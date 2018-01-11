import 'angular';
import UsersConfig from './users.config';
import UsersService from './services/users.service';
import usersListComponent from './components/list/users-list.component';
import usersEditComponent from './components/edit/users-edit.component';
import usersInfoComponent from './components/info/users-info.component';

angular.module('app.modules.users', [])
    .config(UsersConfig.inst())
    .service('UsersService', UsersService)
    .component(usersListComponent.name, usersListComponent)
    .component(usersEditComponent.name, usersEditComponent)
    .component(usersInfoComponent.name, usersInfoComponent);