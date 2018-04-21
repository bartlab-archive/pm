import LayoutBlankController from './layout-blank.controller';
import layoutBlankTemplate from './layout-blank.html';
import './layout-blank.scss';
import ComponentBase from "base/component.base";

export default class LayoutBlankComponent extends ComponentBase {

    static get controller() {
        return LayoutBlankController;
    }

    static get template() {
        return layoutBlankTemplate;
    }
}