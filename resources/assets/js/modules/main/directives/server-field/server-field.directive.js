import DirectiveBase from 'base/directive.base';

export default class ServerFieldDirective extends DirectiveBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.require = '?ngModel';
    }

    link(scope, elm, attr, ctrl) {
        if (!ctrl) {
            return;
        }

        attr.$observe('serverField', () => this.observe(ctrl));
        ctrl.$validators.server = (modelValue, viewValue) => this.validators(ctrl, modelValue, viewValue);
    }

    observe(ctrl) {
        ctrl.$server = undefined;
        ctrl.$previousValue = ctrl.$viewValue;
        ctrl.$validate();
    }

    validators(ctrl, modelValue, viewValue) {
        if (ctrl.$previousValue !== viewValue) {
            ctrl.$server = undefined;
        }

        ctrl.$previousValue = ctrl.$viewValue;
        return !ctrl.$server;
    }
}