import MainResetPasswordController from './main-reset-password.controller';
import mainResetPasswordTemplate from './main-reset-password.html';
import './main-reset-password.scss';
import ComponentBase from "base/component.base";

export default class MainResetPasswordComponent extends ComponentBase {

    static get controller() {
        return MainResetPasswordController;
    }

    static get template() {
        return mainResetPasswordTemplate;
    }

}