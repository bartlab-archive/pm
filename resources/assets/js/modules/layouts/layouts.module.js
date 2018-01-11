import 'angular';
import LayoutConfig from './layouts.config';
import layoutBlankComponent from './components/blank/layout-blank.component';
import layoutDefaultComponent from './components/default/layout-default.component';

angular.module('app.modules.layouts', [])
    .config(LayoutConfig.inst())
    .component(layoutBlankComponent.name, layoutBlankComponent)
    .component(layoutDefaultComponent.name, layoutDefaultComponent);