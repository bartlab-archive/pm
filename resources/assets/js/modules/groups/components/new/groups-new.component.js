import GroupsNewController from './groups-new.controller';
import groupsNewTemplate from './groups-new.html';
import ComponentBase from "base/component.base";

export default class groupsNewComponent extends ComponentBase {

    static get controller() {
        return GroupsNewController;
    }

    static get template() {
        return groupsNewTemplate;
    }
}