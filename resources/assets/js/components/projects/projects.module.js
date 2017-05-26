import 'angular';

import ProjectsConfig from './projects.config';
import projectsListComponent from './list/projects-list.component';

angular.module('app.components.projects', [])
    .config(ProjectsConfig)
    .component('projectsListComponent', projectsListComponent);