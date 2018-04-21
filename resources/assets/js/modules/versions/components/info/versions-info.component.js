import VersionsInfoController from './versions-info.controller';
import versionsInfoTemplate from './versions-info.html';
import ComponentBase from "base/component.base";

export default class VersionsInfoComponent extends ComponentBase {

    static get controller() {
        return VersionsInfoController;
    }

    static get template() {
        return versionsInfoTemplate;
    }
}