import MainIndexController from './main-index.controller';
import mainIndexTemplate from './main-index.html';
import ComponentBase from "base/component.base";

export default class MainIndexComponent extends ComponentBase {

    static get controller() {
        return MainIndexController;
    }

    static get template() {
        return mainIndexTemplate;
    }

}