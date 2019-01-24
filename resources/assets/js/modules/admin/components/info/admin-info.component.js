import AdminInfoController from './admin-info.controller';
import adminInfoTemplate from './admin-info.html';
import ComponentBase from "base/component.base";

export default class AdminInfoComponent extends ComponentBase {

    static get controller() {
        return AdminInfoController;
    }

    static get template() {
        return adminInfoTemplate;
    }

}