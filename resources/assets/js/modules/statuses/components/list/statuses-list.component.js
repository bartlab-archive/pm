import StatusesListController from './statuses-list.controller';
import statusesListTemplate from './statuses-list.html';
import ComponentBase from "base/component.base";

export default class StatusesListComponent extends ComponentBase {

    static get controller() {
        return StatusesListController;
    }

    static get template() {
        return statusesListTemplate;
    }
}