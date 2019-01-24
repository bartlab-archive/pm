import AuthIndexController from './auth-index.controller';
import authIndexTemplate from './auth-index.html';
import ComponentBase from "base/component.base";

export default class AuthIndexComponent extends ComponentBase {

    static get controller() {
        return AuthIndexController;
    }

    static get template() {
        return authIndexTemplate;
    }
}