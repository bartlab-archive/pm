import NewsListController from './news-list.controller';
import newsListTemplate from './news-list.html';
import ComponentBase from "base/component.base";

export default class NewsListComponent extends ComponentBase {

    static get controller() {
        return NewsListController;
    }

    static get template() {
        return newsListTemplate;
    }
}