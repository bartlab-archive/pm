import 'angular';
import ProjectsConfig from './projects.config';
import FilesService from './services/files.service';
import ProjectsService from './services/projects.service';
import projectsListComponent from './components/list/projects-list.component';
import projectsNewComponent from './components/new/projects-new.component';
import projectsInfoComponent from './components/info/projects-info.component';
import projectsSettingsComponent from './components/settings/projects-settings.component';
import projectsActivityComponent from './components/activity/projects-activity.component';
import projectsCalendarComponent from './components/calendar/projects-calendar.component';
import projectsGanttComponent from './components/gantt/projects-gantt.component';
import projectsNewsComponent from './components/news/projects-news.component';
import projectsDocumentsComponent from './components/documents/projects-documents.component';
import projectsFilesComponent from './components/files/projects-files.component';
import projectsBoardsComponent from './components/boards/projects-boards.component';
import projectsRepositoryComponent from './components/repository/projects-repository.component';
import projectsMemberComponent from './components/member/projects-member.component';
import projectsVersionComponent from './components/version/projects-version.component';
import projectsCategoryComponent from './components/cetegory/projects-category.component';


angular.module('app.modules.projects', ['ngFileSaver'])
    .config(ProjectsConfig.inst())
    .service('FilesService', FilesService)
    .service('ProjectsService', ProjectsService)
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
    .component(projectsRepositoryComponent.name, projectsRepositoryComponent)
    .component(projectsBoardsComponent.name, projectsBoardsComponent)
    .component(projectsMemberComponent.name, projectsMemberComponent)
    .component(projectsVersionComponent.name, projectsVersionComponent)
    .component(projectsCategoryComponent.name, projectsCategoryComponent);