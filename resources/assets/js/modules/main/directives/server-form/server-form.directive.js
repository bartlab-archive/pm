import DirectiveBase from 'base/directive.base';

export default class ServerFormDirective extends DirectiveBase {

    static get $inject() {
        return ['$filter'];
    }

    $onInit() {
        this.require = 'form';
        this.scope = {
            serverForm: '='
        };
    }

    link(scope, elm, attr, ctrl) {
        if (!ctrl) {
            return;
        }

        scope.$watch('serverForm', (values) => this.server(ctrl, values));
    }

    server(ctrl, values) {
        if (!values) {
            return;
        }

        for (const field of Object.keys(values)) {
            if (ctrl.hasOwnProperty(field) && ctrl[field].hasOwnProperty('$server')) {
                // ctrl[field].$touched = true;
                // ctrl[field].$pristine = false;

                ctrl[field].$setTouched();
                ctrl[field].$setDirty();

                ctrl[field].$server = this.$filter('join')(values[field]);
                ctrl[field].$validate();
            }
        }
    }
}