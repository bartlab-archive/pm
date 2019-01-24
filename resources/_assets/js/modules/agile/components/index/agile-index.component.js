import AgileIndexController from './agile-index.controller';
import agileIndexTemplate from './agile-index.html';
import './agile-index.scss';
import ComponentBase from "base/component.base";

export default class AgileIndexComponent extends ComponentBase {

    static get controller() {
        return AgileIndexController;
    }

    static get template() {
        return agileIndexTemplate;
    }

}
