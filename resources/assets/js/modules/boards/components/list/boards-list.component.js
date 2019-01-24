import BoardsListController from './boards-list.controller';
import boardsListTemplate from './boards-list.html';
import ComponentBase from "base/component.base";

export default class BoardsListComponent extends ComponentBase {

    static get controller() {
        return BoardsListController;
    }

    static get template() {
        return boardsListTemplate;
    }
}