import ProjectsSettingsInfoController from './projects-settings-info.controller';
import projectsSettingsInfoTemplate from './projects-settings-info.html';

export default {
    name: 'projectsSettingsInfoComponent',
    controller: ProjectsSettingsInfoController,
    template: projectsSettingsInfoTemplate,
    bindings:{
        project: '='
    }
};