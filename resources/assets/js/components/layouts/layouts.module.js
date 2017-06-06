import 'angular';

import layoutConfig from './layouts.config';

import layoutBlankComponent from './blank/layout-blank.component';
import layoutDefaultComponent from './default/layout-default.component';

angular.module('app.components.layouts', [])
    .config(layoutConfig)
    .component(layoutBlankComponent.name, layoutBlankComponent)
    .component(layoutDefaultComponent.name, layoutDefaultComponent);