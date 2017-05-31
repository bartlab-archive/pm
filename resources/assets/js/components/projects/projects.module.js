import 'angular';

import ProjectsConfig from './projects.config';
import projectsListComponent from './list/projects-list.component';
import projectsNewComponent from './new/projects-new.component';

angular.module('app.components.projects', [])
    .config(ProjectsConfig)
    .component('projectsListComponent', projectsListComponent)
    .component('projectsNewComponent', projectsNewComponent);