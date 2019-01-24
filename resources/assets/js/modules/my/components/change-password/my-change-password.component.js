import ComponentBase from "base/component.base";
import MyChangePasswordController from './my-change-password.controller.js';
import myChangePasswordTemplate from './my-change-password.html';

export default class MyChangePasswordComponent extends ComponentBase {

    static get controller() {
        return MyChangePasswordController;
    }

    static get template() {
        return myChangePasswordTemplate;
    }
}