import 'angular';
import LayoutConfig from './layouts.config';
import LayoutBlankComponent from './components/blank/layout-blank.component';
import LayoutDefaultComponent from './components/default/layout-default.component';

angular.module('app.modules.layouts', [])
    .config(LayoutConfig.inst())
    .component(LayoutBlankComponent.getName(), LayoutBlankComponent)
    .component(LayoutDefaultComponent.getName(), LayoutDefaultComponent);