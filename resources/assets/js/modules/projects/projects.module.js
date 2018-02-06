import 'angular';
import ProjectsConfig from './projects.config';
import ProjectsProvider from './providers/projects.provider';
import projectsListComponent from './components/list/projects-list.component';
import projectsNewComponent from './components/new/projects-new.component';
import projectsInfoComponent from './components/info/projects-info.component';
import projectsSettingsComponent from './components/settings/projects-settings.component';
import projectsMemberComponent from './components/member/projects-member.component';
import projectsSettingsInfoComponent from './components/settings-info/projects-settings-info.component';
import projectsSettingsMembersComponent from './components/settings-members/projects-settings-members.component';
import projectsSettingsModulesComponent from './components/settings-modules/projects-settings-modules.component';


angular.module('app.modules.projects', ['ngFileSaver'])
    .config(ProjectsConfig.inst())
    // .service('ProjectsService', ProjectsService)
    .provider('ProjectsService', ProjectsProvider)
    .component(projectsListComponent.name, projectsListComponent)
    .component(projectsNewComponent.name, projectsNewComponent)
    .component(projectsInfoComponent.name, projectsInfoComponent)
    .component(projectsSettingsComponent.name, projectsSettingsComponent)
    .component(projectsSettingsInfoComponent.name,projectsSettingsInfoComponent)
    .component(projectsSettingsMembersComponent.name,projectsSettingsMembersComponent)
    .component(projectsSettingsModulesComponent.name,projectsSettingsModulesComponent)
    .component(projectsMemberComponent.name, projectsMemberComponent);