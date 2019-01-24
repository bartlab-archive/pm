import ComponentBase from "base/component.base";
import MainRegistrationController from './main-registration.controller';
import mainRegistrationTemplate from './main-registration.html';

export default class MainRegistrationComponent extends ComponentBase {

    static get controller() {
        return MainRegistrationController;
    }

    static get template() {
        return mainRegistrationTemplate;
    }
}