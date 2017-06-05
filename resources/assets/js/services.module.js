import 'angular';
import ProjectsService from 'services/projects.service';
import UsersService from 'services/users.service';

angular.module('app.services', [])
    .service('ProjectsService', ProjectsService)
    .service('UsersService', UsersService);