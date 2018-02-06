import ProjectsSettingsMembersController from './projects-settings-members.controller';
import projectsSettingsMembersTemplate from './projects-settings-members.html';

export default {
    name: 'projectsSettingsMembersComponent',
    controller: ProjectsSettingsMembersController,
    template: projectsSettingsMembersTemplate,
    bindings:{
        project: '='
    }
};