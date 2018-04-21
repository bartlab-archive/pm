import StatusesIndexController from './statuses-index.controller';
import statusesIndexTemplate from './statuses-index.html';
import ComponentBase from "base/component.base";

export default class StatusesIndexComponent extends ComponentBase {

    static get controller() {
        return StatusesIndexController;
    }

    static get template() {
        return statusesIndexTemplate;
    }
}