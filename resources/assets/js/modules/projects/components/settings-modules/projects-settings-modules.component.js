import ProjectsSettingsModulesController from './projects-settings-modules.controller';
import projectsSettingsModulesTemplate from './projects-settings-modules.html';

export default {
    name: 'projectsSettingsModulesComponent',
    controller: ProjectsSettingsModulesController,
    template: projectsSettingsModulesTemplate,
    bindings:{
        project: '='
    }
};