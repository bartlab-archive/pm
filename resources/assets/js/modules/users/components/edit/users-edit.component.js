import UsersEditController from './users-edit.controller';
import usersEditTemplate from './users-edit.html';
import ComponentBase from "base/component.base";

export default class UsersEditComponent extends ComponentBase {

    static get controller() {
        return UsersEditController;
    }

    static get template() {
        return usersEditTemplate;
    }
}