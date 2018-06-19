import ComponentBase from "base/component.base";
import MainLoginController from './main-login.controller';
import mainLoginTemplate from './main-login.html';

export default class MainLoginComponent extends ComponentBase {

    static get controller() {
        return MainLoginController;
    }

    static get template() {
        return mainLoginTemplate;
    }

    static get bindings() {
        return {
            model: '<'
        };
    }
}