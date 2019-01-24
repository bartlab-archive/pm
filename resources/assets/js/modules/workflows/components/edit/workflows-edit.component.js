import WorkflowsEditController from './workflows-edit.controller';
import workflowsEditTemplate from './workflows-edit.html';
import ComponentBase from "base/component.base";

export default class WorkflowsEditComponent extends ComponentBase {

    static get controller() {
        return WorkflowsEditController;
    }

    static get template() {
        return workflowsEditTemplate;
    }
}