import VersionsNewController from './versions-new.controller';
import versionsNewTemplate from './versions-new.html';
import ComponentBase from "base/component.base";

export default class VersionsNewComponent extends ComponentBase {

    static get controller() {
        return VersionsNewController;
    }

    static get template() {
        return versionsNewTemplate;
    }
}