import DirectiveBase from 'base/directive.base';
import MDE from './mde';
// import SimpleMDE from 'simplemde';
import './mde.scss';

export default class MdeDirective extends DirectiveBase {

    static get $inject() {
        return ['$parse'];
    }

    $onInit() {
        this.restrict = 'A';
        this.require = 'ngModel';
        // this.controller = ['$scope', ($scope) => {
        //     return {
        //         get: () => $scope.simplemde.instance,
        //         rerenderPreview: (val) => $scope.simplemde.rerenderPreview(val)
        //     };
        // }]
    }

    link(scope, element, attrs, ngModel) {
        let options;//, rerenderPreview;

        options = this.$parse(attrs.mde)(scope) || {};
        options.element = element[0];
        // options.lineWrapping = true;

        let mde = new MDE(options);

        mde.codemirror.on('change', () => {
            scope.$applyAsync(() => {
                ngModel.$setViewValue(mde.value());
            });
        });

        ngModel.$render = () => {
            let val = ngModel.$modelValue || options["default"];

            mde.value(val);
            // if (mde.isPreviewActive()) {
            //     rerenderPreview(val);
            // }
        };

        // rerenderPreview = (val) => {
        // };

        // scope.simplemde = {
        //     instance: mde,
        //     rerenderPreview: rerenderPreview
        // };
    }
}