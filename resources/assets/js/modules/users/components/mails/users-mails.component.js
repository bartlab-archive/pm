import UsersMailsController from './users-mails.controller';
import usersMailsTemplate from './users-mails.html';
import ComponentBase from "base/component.base";

export default class UsersMailsComponent extends ComponentBase {

    static get controller() {
        return UsersMailsController;
    }

    static get template() {
        return usersMailsTemplate;
    }
}