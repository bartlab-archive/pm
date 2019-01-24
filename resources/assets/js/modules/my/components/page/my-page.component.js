import MyPageController from './my-page.controller';
import myPageTemplate from './my-page.html';
import ComponentBase from "base/component.base";

export default class MyPageComponent extends ComponentBase {

    static get controller() {
        return MyPageController;
    }

    static get template() {
        return myPageTemplate;
    }
}