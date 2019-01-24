import TimesListController from './times-list.controller';
import timesListTemplate from './times-list.html';
import ComponentBase from "base/component.base";

export default class TimesListComponent extends ComponentBase {

    static get controller() {
        return TimesListController;
    }

    static get template() {
        return timesListTemplate;
    }
}