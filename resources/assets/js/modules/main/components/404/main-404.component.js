import Main404Controller from './main-404.controller';
import main404Template from './main-404.html';
import ComponentBase from "base/component.base";

export default class Main404Component extends ComponentBase {

    static get controller() {
        return Main404Controller;
    }

    static get template() {
        return main404Template;
    }
}