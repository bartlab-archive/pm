import DirectiveBase from 'base/directive.base';

export default class MultiFileDirective extends DirectiveBase {

    static get $inject() {
        return ['$parse'];
    }

    link(scope, element, attrs) {
        let model = this.$parse(attrs.multiFile);
        let isMultiple = attrs.multiple;
        let modelSetter = model.assign;
        element.bind('change', function () {
            let values = [];
            angular.forEach(element[0].files, function (item) {
                let value = {
                    // File Name 
                    name: item.name,
                    //File Size 
                    size: item.size,
                    //File URL to view 
                    url: URL.createObjectURL(item),
                    // File Input Value 
                    _file: item
                };
                values.push(value);
            });
            scope.$apply(function () {
                if (isMultiple) {
                    modelSetter(scope, values.concat(model(scope)));
                } else {
                    modelSetter(scope, [values[0]].concat(model(scope)));
                }
            });
        });
    }
}