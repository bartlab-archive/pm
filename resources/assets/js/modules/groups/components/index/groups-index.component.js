import GroupsIndexController from './groups-index.controller';
import groupsIndexTemplate from './groups-index.html';
import ComponentBase from "base/component.base";

export default class GroupsIndexComponent extends ComponentBase {

    static get controller() {
        return GroupsIndexController;
    }

    static get template() {
        return groupsIndexTemplate;
    }
}