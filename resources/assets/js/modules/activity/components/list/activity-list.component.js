import ActivityListController from './activity-list.controller';
import activityListTemplate from './activity-list.html';
import ComponentBase from "base/component.base";

export default class ActivityListComponent extends ComponentBase {

    static get controller() {
        return ActivityListController;
    }

    static get template() {
        return activityListTemplate;
    }

}