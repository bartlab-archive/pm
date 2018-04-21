import 'angular';
import ProjectsConfig from './projects.config';
import ProjectsProvider from './providers/projects.provider';
// import Projects from './factories/projects.factory';
import ProjectsFormComponent from './components/form/projects-form.component';
import ProjectsListComponent from './components/list/projects-list.component';
import ProjectsNewComponent from './components/new/projects-new.component';
import ProjectsInfoComponent from './components/info/projects-info.component';
import ProjectsSettingsComponent from './components/settings/projects-settings.component';
import ProjectsMemberComponent from './components/member/projects-member.component';
import ProjectsSettingsInfoComponent from './components/settings-info/projects-settings-info.component';
import ProjectsSettingsMembersComponent from './components/settings-members/projects-settings-members.component';
import ProjectsSettingsModulesComponent from './components/settings-modules/projects-settings-modules.component';


angular.module('app.modules.projects', [])
    .config(ProjectsConfig.inst())
    .provider(ProjectsProvider.getName(), ProjectsProvider)
    .component(ProjectsFormComponent.getName(), ProjectsFormComponent)
    .component(ProjectsNewComponent.getName(), ProjectsNewComponent)
    .component(ProjectsListComponent.getName(), ProjectsListComponent)
    .component(ProjectsInfoComponent.getName(), ProjectsInfoComponent)
    .component(ProjectsSettingsComponent.getName(), ProjectsSettingsComponent)
    .component(ProjectsSettingsInfoComponent.getName(), ProjectsSettingsInfoComponent)
    .component(ProjectsSettingsMembersComponent.getName(), ProjectsSettingsMembersComponent)
    .component(ProjectsSettingsModulesComponent.getName(), ProjectsSettingsModulesComponent)
    .component(ProjectsMemberComponent.getName(), ProjectsMemberComponent);