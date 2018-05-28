import WikisRenameController from './wikis-rename.controller';
import wikisRenameTemplate from './wikis-rename.html';
import ComponentBase from "base/component.base";

export default class WikisRenameComponent extends ComponentBase {

    static get controller() {
        return WikisRenameController;
    }

    static get template() {
        return wikisRenameTemplate;
    }
}