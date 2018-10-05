import BoardsNewController from './boards-new.controller';
import boardsNewTemplate from './boards-new.html';
import ComponentBase from "base/component.base";

export default class BoardsNewComponent extends ComponentBase {

    static get controller() {
        return BoardsNewController;
    }

    static get template() {
        return boardsNewTemplate;
    }
}