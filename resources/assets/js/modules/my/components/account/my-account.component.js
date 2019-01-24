import ComponentBase from "base/component.base";
import MyAccountController from './my-account.controller';
import myAccountTemplate from './my-account.html';

export default class MyAccountComponent extends ComponentBase {

    static get controller() {
        return MyAccountController;
    }

    static get template() {
        return myAccountTemplate;
    }
}