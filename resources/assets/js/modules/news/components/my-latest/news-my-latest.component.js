import NewsMyLatestController from './news-my-latest.controller';
import newsMyLatestTemplate from './news-my-latest.html';
import ComponentBase from "base/component.base";

export default class NewsMyLatestComponent extends ComponentBase {

    static get controller() {
        return NewsMyLatestController;
    }

    static get template() {
        return newsMyLatestTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}