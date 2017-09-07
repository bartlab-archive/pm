import 'angular';
import ProjectsService from 'services/projects.service';
import UsersService from 'services/users.service';
import WikiService from 'services/wiki.service';
import IssuesService from 'services/issues.service';
import NewsService from 'services/news.service';
import FilesService from 'services/files.service';
import RolesService from 'services/roles.service';
import EnumerationsService from 'services/enumerations.service';
import TrackersService from 'services/trackers.service';

angular.module('app.services', [])
    .service(ProjectsService.name, ProjectsService)
    .service(UsersService.name, UsersService)
    .service(NewsService.name, NewsService)
    .service(WikiService.name, WikiService)
    .service(IssuesService.name, IssuesService)
    .service(FilesService.name, FilesService)
    .service(RolesService.name, RolesService)
    .service(EnumerationsService.name, EnumerationsService)
    .service(TrackersService.name, TrackersService);