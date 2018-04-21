import NewsEditController from './news-edit.controller';
import newsEditTemplate from './news-edit.html';
import ComponentBase from "base/component.base";

export default class NewsEditComponent extends ComponentBase {

    static get controller() {
        return NewsEditController;
    }

    static get template() {
        return newsEditTemplate;
    }
}