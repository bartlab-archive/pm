import 'angular';
import DemoDirective from 'directives/demo/demo.directive';
import ScrollbarDirective from 'directives/scrollbar/scrollbar.directive';
import ScrollBarProvider from 'directives/scrollbar/scrollbar.provider';

angular.module('app.directives', [])
    .provider('ScrollBar', ScrollBarProvider.inst())
    .directive(DemoDirective.selector, DemoDirective.inst())
    .directive(ScrollbarDirective.selector, ScrollbarDirective.inst());