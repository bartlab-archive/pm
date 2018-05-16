import DirectiveBase from 'base/directive.base';
import SimpleMDE from 'simplemde';

export default class SimplemdeDirective extends DirectiveBase {

    static get $inject() {
        return ['$parse'];
    }

    $onInit() {
        this.restrict = 'A';
        this.require = 'ngModel';
        this.controller = ['$scope', function ($scope) {
            return {
                get: () => $scope.simplemde.instance,
                rerenderPreview: (val) => $scope.simplemde.rerenderPreview(val)
            };
        }]
    }

    link(scope, element, attrs, ngModel) {
        let options, rerenderPreview;

        options = this.$parse(attrs.simplemde)(scope) || {};
        options.element = element[0];

        let mde = new SimpleMDE(options);

        mde.codemirror.on('change', () => {
            scope.$applyAsync(() => {
                ngModel.$setViewValue(mde.value());
            });
        });

        ngModel.$render = () => {
            let val = ngModel.$modelValue || options["default"];

            mde.value(val);
            if (mde.isPreviewActive()) {
                rerenderPreview(val);
            }
        };

        rerenderPreview = (val) => {
        };

        scope.simplemde = {
            instance: mde,
            rerenderPreview: rerenderPreview
        };
    }
}