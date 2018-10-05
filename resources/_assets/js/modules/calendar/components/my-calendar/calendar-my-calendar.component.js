import CalendarMyCalendarController from './calendar-my-calendar.controller';
import calendarMyCalendarTemplate from './calendar-my-calendar.html';
import ComponentBase from "base/component.base";

export default class CalendarMyCalendarComponent extends ComponentBase {

    static get controller() {
        return CalendarMyCalendarController;
    }

    static get template() {
        return calendarMyCalendarTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}