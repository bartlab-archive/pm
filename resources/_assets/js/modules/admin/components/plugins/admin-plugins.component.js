import AdminPluginsController from './admin-plugins.controller';
import adminPluginsTemplate from './admin-plugins.html';
import ComponentBase from "base/component.base";

export default class AdminPluginsComponent extends ComponentBase {

    static get controller() {
        return AdminPluginsController;
    }

    static get template() {
        return adminPluginsTemplate;
    }

}