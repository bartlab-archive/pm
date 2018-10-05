import CalendarIndexController from './calendar-index.controller';
import calendarIndexTemplate from './calendar-index.html';
import './calendar-index.scss';
import ComponentBase from "base/component.base";

export default class CalendarIndexComponent extends ComponentBase {

    static get controller() {
        return CalendarIndexController;
    }

    static get template() {
        return calendarIndexTemplate;
    }
}