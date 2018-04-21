import UsersListController from './users-list.controller';
import usersListTemplate from './users-list.html';
import ComponentBase from "base/component.base";

export default class UsersListComponent extends ComponentBase {

    static get controller() {
        return UsersListController;
    }

    static get template() {
        return usersListTemplate;
    }
}