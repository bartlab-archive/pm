import WikisPreviewController from './wikis-preview.controller';
import wikisPreviewTemplate from './wikis-preview.html';
import ComponentBase from "base/component.base";

export default class WikisPreviewComponent extends ComponentBase {

    static get controller() {
        return WikisPreviewController;
    }

    static get template() {
        return wikisPreviewTemplate;
    }
}