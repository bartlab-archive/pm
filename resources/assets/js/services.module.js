import 'angular';
import ProjectsService from 'services/projects.service';
import UsersService from 'services/users.service';
import MaterialToastService from 'services/material-toast.service';
import WikiService from 'services/wiki.service';

angular.module('app.services', [])
    .service('ProjectsService', ProjectsService)
    .service('UsersService', UsersService)
    .service('MaterialToastService', MaterialToastService)
    .service('WikiService', WikiService);