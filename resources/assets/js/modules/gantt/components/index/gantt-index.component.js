import GanttIndexController from './gantt-index.controller';
import ganttIndexTemplate from './gantt-index.html';
import './gantt-index.scss';
import ComponentBase from "base/component.base";

export default class GanttIndexComponent extends ComponentBase {

    static get controller() {
        return GanttIndexController;
    }

    static get template() {
        return ganttIndexTemplate;
    }
}