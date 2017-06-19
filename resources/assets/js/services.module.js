import 'angular';
import ProjectsService from 'services/projects.service';
import UsersService from 'services/users.service';
import MaterialToastService from 'services/material-toast.service';
import IssuesService from 'services/issues.service'
import NewsService from 'services/news.service'

angular.module('app.services', [])
    .service('ProjectsService', ProjectsService)
    .service('UsersService', UsersService)
    .service('MaterialToastService', MaterialToastService)
    .service('IssuesService', IssuesService)
    .service('NewsService', NewsService);