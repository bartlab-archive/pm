import UsersInfoController from './users-info.controller';
import usersInfoTemplate from './users-info.html';
import ComponentBase from "base/component.base";

export default class UsersInfoComponent extends ComponentBase {

    static get controller() {
        return UsersInfoController;
    }

    static get template() {
        return usersInfoTemplate;
    }
}