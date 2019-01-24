import LayoutDefaultController from './layout-default.controller';
import layoutDefaultTemplate from './layout-default.html';
import './layout-default.scss';
import ComponentBase from "base/component.base";

export default class LayoutDefaultComponent extends ComponentBase {

    static get controller() {
        return LayoutDefaultController;
    }

    static get template() {
        return layoutDefaultTemplate;
    }
}