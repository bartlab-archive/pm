import WorkflowsIndexController from './workflows-index.controller';
import workflowsIndexTemplate from './workflows-index.html';
import ComponentBase from "base/component.base";

export default class WorkflowsIndexComponent extends ComponentBase {

    static get controller() {
        return WorkflowsIndexController;
    }

    static get template() {
        return workflowsIndexTemplate;
    }
}