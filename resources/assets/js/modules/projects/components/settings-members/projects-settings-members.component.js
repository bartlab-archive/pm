import ProjectsSettingsMembersController from './projects-settings-members.controller';
import projectsSettingsMembersTemplate from './projects-settings-members.html';
import ComponentBase from "base/component.base";

export default class ProjectsSettingsMembersComponent extends ComponentBase {

    static get controller() {
        return ProjectsSettingsMembersController;
    }

    static get template() {
        return projectsSettingsMembersTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }

}