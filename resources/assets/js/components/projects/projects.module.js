import 'angular';

import ProjectsConfig from './projects.config';
import projectsListComponent from './list/projects-list.component';
import projectsNewComponent from './new/projects-new.component';
import projectsInfoComponent from './info/projects-info.component';
import projectsSettingsComponent from './settings/projects-settings.component';
import projectsActivityComponent from './activity/projects-activity.component';
import projectsCalendarComponent from './calendar/projects-calendar.component';
import projectsGanttComponent from './gantt/projects-gantt.component';
import projectsNewsComponent from './news/projects-news.component';
import projectsDocumentsComponent from './documents/projects-documents.component';
import projectsFilesComponent from './files/projects-files.component';
import projectsBoardsComponent from './boards/projects-boards.component';


angular.module('app.components.projects', ['ngFileSaver'])
    .config(ProjectsConfig.inst())
    .component(projectsListComponent.name, projectsListComponent)
    .component(projectsNewComponent.name, projectsNewComponent)
    .component(projectsInfoComponent.name, projectsInfoComponent)
    .component(projectsSettingsComponent.name, projectsSettingsComponent)
    .component(projectsActivityComponent.name, projectsActivityComponent)
    .component(projectsCalendarComponent.name, projectsCalendarComponent)
    .component(projectsGanttComponent.name, projectsGanttComponent)
    .component(projectsNewsComponent.name, projectsNewsComponent)
    .component(projectsDocumentsComponent.name, projectsDocumentsComponent)
    .component(projectsFilesComponent.name, projectsFilesComponent)
    .component(projectsBoardsComponent.name, projectsBoardsComponent);
