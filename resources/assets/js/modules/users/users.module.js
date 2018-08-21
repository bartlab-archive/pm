import 'angular';
import UsersConfig from './users.config';
import UsersService from './services/users.service';
import UsersListComponent from './components/list/users-list.component';
import UsersEditComponent from './components/edit/users-edit.component';
import UsersInfoComponent from './components/info/users-info.component';

angular.module('app.modules.users', [])
    .config(UsersConfig.inst())
    .service(UsersService.getName(), UsersService)
    .component(UsersListComponent.getName(), UsersListComponent)
    .component(UsersEditComponent.getName(), UsersEditComponent)
    .component(UsersInfoComponent.getName(), UsersInfoComponent)
    .constant('USER_STATUS_ACTIVE', 1)
    .constant('USER_STATUS_DISABLE', 2)
    .constant('USER_STATUS_LOCK', 3);

// todo: register modules for user profile as "my" and "project"