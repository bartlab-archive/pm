import DocumentsListController from './documents-list.controller';
import documentsListTemplate from './documents-list.html';
import ComponentBase from "base/component.base";

export default class DocumentsListComponent extends ComponentBase {

    static get controller() {
        return DocumentsListController;
    }

    static get template() {
        return documentsListTemplate;
    }
}