import MainRegistrationController from './main-registration.controller';
import mainRegistrationTemplate from './main-registration.html';
import './main-registration.scss';
import ComponentBase from "base/component.base";

export default class MainRegistrationComponent extends ComponentBase {

    static get controller() {
        return MainRegistrationController;
    }

    static get template() {
        return mainRegistrationTemplate;
    }
}