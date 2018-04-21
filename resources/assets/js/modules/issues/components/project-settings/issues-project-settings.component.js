import IssuesProjectSettingsController from './issues-project-settings.controller';
import issuesProjectSettingsTemplate from './issues-project-settings.html';
import ComponentBase from "base/component.base";

export default class IssuesProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return IssuesProjectSettingsController;
    }

    static get template() {
        return issuesProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}