import MyMailsController from './my-mails.controller';
import myMailsTemplate from './my-mails.html';
import './my-mails.scss'
import ComponentBase from "base/component.base";

export default class MyMailsComponent extends ComponentBase {

    static get controller() {
        return MyMailsController;
    }

    static get template() {
        return myMailsTemplate;
    }
}