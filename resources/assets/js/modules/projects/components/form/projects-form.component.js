import ProjectsFormController from './projects-form.controller';
import projectsFormTemplate from './projects-form.html';
import ComponentBase from "base/component.base";

export default class ProjectsFormComponent extends ComponentBase {

    static get controller() {
        return ProjectsFormController;
    }

    static get template() {
        return projectsFormTemplate;
    }

    static get bindings() {
        return {
            errors: '=?',
            form: '=?',
            project: '='
        };
    }
}