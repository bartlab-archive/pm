import WikiPreviewController from './wiki-preview.controller';
import wikiPreviewTemplate from './wiki-preview.html';
import ComponentBase from "base/component.base";

export default class WikiPreviewComponent extends ComponentBase {

    static get controller() {
        return WikiPreviewController;
    }

    static get template() {
        return wikiPreviewTemplate;
    }
}