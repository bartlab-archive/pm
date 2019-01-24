import DirectiveBase from 'base/directive.base';

export default class CompileDirective extends DirectiveBase {

    static get $inject() {
        return ['$compile'];
    }

    $onInit() {
    }

    link(scope, element, attrs, controller, transcludeFn) {
        // watch the 'compile' expression for changes
        scope.$watch(
            (scope) => scope.$eval(attrs.compile),
            (value) => {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                this.$compile(element.contents())(scope);
            }
        );
    }
}