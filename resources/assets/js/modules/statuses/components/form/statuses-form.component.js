import StatusesFormController from './statuses-form.controller';
import statusesFormTemplate from './statuses-form.html';
import ComponentBase from "base/component.base";

export default class StatusesFormComponent extends ComponentBase {

    static get controller() {
        return StatusesFormController;
    }

    static get template() {
        return statusesFormTemplate;
    }
}