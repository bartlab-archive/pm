import UsersChangePasswordController from './users-change-password.controller';
import usersChangePasswordTemplate from './users-change-password.html';
import './users-change-password.scss';
import ComponentBase from "base/component.base";

export default class UsersChangePasswordComponent extends ComponentBase {

    static get controller() {
        return UsersChangePasswordController;
    }

    static get template() {
        return usersChangePasswordTemplate;
    }
}