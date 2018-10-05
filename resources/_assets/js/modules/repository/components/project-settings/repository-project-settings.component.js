import RepositoryProjectSettingsController from './repository-project-settings.controller';
import repositoryProjectSettingsTemplate from './repository-project-settings.html';
import ComponentBase from "base/component.base";

export default class RepositoryProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return RepositoryProjectSettingsController;
    }

    static get template() {
        return repositoryProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}