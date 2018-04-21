import NewsViewController from './news-view.controller';
import newsViewTemplate from './news-view.html';
import ComponentBase from "base/component.base";

export default class NewsViewComponent extends ComponentBase {

    static get controller() {
        return NewsViewController;
    }

    static get template() {
        return newsViewTemplate;
    }
}