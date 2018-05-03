import DirectiveBase from 'base/directive.base';
import demoTemplate from './demo.html';
import './demo.scss';

export default class DemoDirective extends DirectiveBase {

    get template() {
        return demoTemplate;
    }

    $onInit() {
    }

    link(scope, element, attrs, controller, transcludeFn) {
    }
}