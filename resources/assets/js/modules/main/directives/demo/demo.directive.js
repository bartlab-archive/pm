import DirectiveBase from 'base/directive.base';
import demoTemplate from './demo.html';
import './demo.scss';

export default class DemoDirective extends DirectiveBase {

    // static get selector() {
    //     return 'demo';
    // }

    $onInit() {
        this.restrict = 'EA';
        this.template = demoTemplate;
    }

    link(scope, element, attrs, controller, transcludeFn) {
    }
}