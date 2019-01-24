import WikisFormController from './wikis-form.controller';
import wikisFormTemplate from './wikis-form.html';
import ComponentBase from "base/component.base";

export default class WikisFormComponent extends ComponentBase {

    static get controller() {
        return WikisFormController;
    }

    static get template() {
        return wikisFormTemplate;
    }
}