import FilesListController from './files-list.controller';
import filesListTemplate from './files-list.html';
import ComponentBase from "base/component.base";

export default class FilesListComponent extends ComponentBase {

    static get controller() {
        return FilesListController;
    }

    static get template() {
        return filesListTemplate;
    }
}