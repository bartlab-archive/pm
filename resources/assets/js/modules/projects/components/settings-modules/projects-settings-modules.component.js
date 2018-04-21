import ProjectsSettingsModulesController from './projects-settings-modules.controller';
import projectsSettingsModulesTemplate from './projects-settings-modules.html';
import ComponentBase from "base/component.base";

export default class ProjectsSettingsModulesComponent extends ComponentBase {

    static get controller() {
        return ProjectsSettingsModulesController;
    }

    static get template() {
        return projectsSettingsModulesTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
};