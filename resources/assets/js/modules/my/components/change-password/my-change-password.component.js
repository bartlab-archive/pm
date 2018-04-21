import MyChangePasswordController from './my-change-password.controller';
import myChangePasswordTemplate from './my-change-password.html';
import './my-change-password.scss';
import ComponentBase from "base/component.base";

export default class MyChangePasswordComponent extends ComponentBase {

    static get controller() {
        return MyChangePasswordController;
    }

    static get template() {
        return myChangePasswordTemplate;
    }
}