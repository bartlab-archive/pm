import 'angular';
import ProjectsService from 'services/projects.service';

angular.module('app.services', [])
    .service('ProjectsService', ProjectsService);