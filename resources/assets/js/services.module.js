import 'angular';
import ProjectsService from 'services/projects.service';
import UsersService from 'services/users.service';
import WikiService from 'services/wiki.service';
import IssuesService from 'services/issues.service'
import NewsService from 'services/news.service'

angular.module('app.services', [])
    .service('ProjectsService', ProjectsService)
    .service('UsersService', UsersService)
    .service('NewsService', NewsService)
    .service('WikiService', WikiService)
    .service('IssuesService', IssuesService)
    .provider('IssuesServiceProvider', function () {
        this.$get = ["IssuesService", function (IssuesService) {
            return IssuesService;
        }];

        return this;
    });