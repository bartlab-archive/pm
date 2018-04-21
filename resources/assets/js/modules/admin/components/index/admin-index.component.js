import AdminIndexController from './admin-index.controller';
import adminIndexTemplate from './admin-index.html';
import ComponentBase from "base/component.base";

export default class AdminIndexComponent extends ComponentBase {

    static get controller() {
        return AdminIndexController;
    }

    static get template() {
        return adminIndexTemplate;
    }

}