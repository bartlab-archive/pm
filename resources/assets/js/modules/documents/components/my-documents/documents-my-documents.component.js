import DocumentsMyDocumentsController from './documents-my-documents.controller';
import documentsMyDocumentsTemplate from './documents-my-documents.html';
import ComponentBase from "base/component.base";

export default class DocumentsMyDocumentsComponent extends ComponentBase {

    static get controller() {
        return DocumentsMyDocumentsController;
    }

    static get template() {
        return documentsMyDocumentsTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}