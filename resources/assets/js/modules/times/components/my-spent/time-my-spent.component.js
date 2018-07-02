import TimeMySpentController from './time-my-spent.controller';
import timeMySpentTemplate from './time-my-spent.html';
import ComponentBase from "base/component.base";

export default class TimeMySpentComponent extends ComponentBase {

    static get controller() {
        return TimeMySpentController;
    }

    static get template() {
        return timeMySpentTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}