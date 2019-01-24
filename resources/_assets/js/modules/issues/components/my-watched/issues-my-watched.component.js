import IssuesMyWatchedController from './issues-my-watched.controller';
import issuesMyWatchedTemplate from './issues-my-watched.html';
import ComponentBase from "base/component.base";

export default class IssuesMyWatchedComponent extends ComponentBase {

    static get controller() {
        return IssuesMyWatchedController;
    }

    static get template() {
        return issuesMyWatchedTemplate;
    }

    // static get bindings() {
    //     return {
    //         params: '='
    //     };
    // }
}