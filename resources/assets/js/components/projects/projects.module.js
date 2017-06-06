import 'angular';

import projectsConfig from './projects.config';
import projectsListComponent from './list/projects-list.component';
import projectsEditComponent from './edit/projects-edit.component';
import projectsInfoComponent from './info/projects-info.component';

angular.module('app.components.projects', [])
    .config(projectsConfig)
    .component(projectsListComponent.name, projectsListComponent)
    .component(projectsEditComponent.name, projectsEditComponent)
    .component(projectsInfoComponent.name, projectsInfoComponent);