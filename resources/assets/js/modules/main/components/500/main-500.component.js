import Main500Controller from './main-500.controller';
import main500Template from './main-500.html';
import ComponentBase from "base/component.base";

export default class Main500Component extends ComponentBase {

    static get controller() {
        return Main500Controller;
    }

    static get template() {
        return main500Template;
    }

}