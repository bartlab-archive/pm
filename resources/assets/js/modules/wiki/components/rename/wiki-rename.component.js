import WikiRenameController from './wiki-rename.controller';
import wikiRenameTemplate from './wiki-rename.html';
import ComponentBase from "base/component.base";

export default class WikiRenameComponent extends ComponentBase {

    static get controller() {
        return WikiRenameController;
    }

    static get template() {
        return wikiRenameTemplate;
    }
}