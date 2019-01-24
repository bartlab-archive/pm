import ComponentBase from "base/component.base";
import MyEmailsController from './my-emails.controller';
import myEmailsTemplate from './my-emails.html';

export default class MyEmailsComponent extends ComponentBase {

    static get controller() {
        return MyEmailsController;
    }

    static get template() {
        return myEmailsTemplate;
    }
}