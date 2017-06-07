import 'angular';

import ProjectsConfig from './projects.config';
import projectsListComponent from './list/projects-list.component';
import projectsEditComponent from './edit/projects-edit.component';
import projectsInfoComponent from './info/projects-info.component';
import projectsIssuesComponent from './issues/projects-issues.component';

angular.module('app.components.projects', [])
    // .config(ProjectsConfig)
    // .component('projectsListComponent', projectsListComponent)
    // .component('projectsEditComponent', projectsEditComponent)
    // .component('projectsInfoComponent', projectsInfoComponent)
    // .component('projectsIssuesComponent', projectsIssuesComponent);
    .config(ProjectsConfig.inst())
    .component(projectsListComponent.name, projectsListComponent)
    .component(projectsEditComponent.name, projectsEditComponent)
    .component(projectsInfoComponent.name, projectsInfoComponent)
    .component(projectsIssuesComponent.name, projectsIssuesComponent);