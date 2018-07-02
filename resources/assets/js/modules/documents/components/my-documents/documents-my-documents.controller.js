import ControllerBase from 'base/controller.base';

export default class DocumentsMyDocumentsController extends ControllerBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.issues = [];
    }

}