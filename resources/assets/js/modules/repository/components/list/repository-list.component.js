import RepositoryListController from './repository-list.controller';
import repositoryListTemplate from './repository-list.html';
import ComponentBase from "base/component.base";

export default class RepositoryListComponent extends ComponentBase {

    static get controller() {
        return RepositoryListController;
    }

    static get template() {
        return repositoryListTemplate;
    }
}