import RolesIndexController from './roles-index.controller';
import rolesIndexTemplate from './roles-index.html';
import ComponentBase from "base/component.base";

export default class RolesIndexComponent extends ComponentBase {

    static get controller() {
        return RolesIndexController;
    }

    static get template() {
        return rolesIndexTemplate;
    }
}