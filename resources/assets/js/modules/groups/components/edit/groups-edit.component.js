import GroupsEditController from './groups-edit.controller';
import groupsEditTemplate from './groups-edit.html';
import ComponentBase from "base/component.base";

export default class GroupsEditComponent extends ComponentBase {

    static get controller() {
        return GroupsEditController;
    }

    static get template() {
        return groupsEditTemplate;
    }
}