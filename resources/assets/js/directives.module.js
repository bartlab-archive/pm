import 'angular';

import DemoDirective from 'directives/demo/demo.directive';

angular.module('app.directives', [])
    .directive(DemoDirective.selector, DemoDirective.inst());