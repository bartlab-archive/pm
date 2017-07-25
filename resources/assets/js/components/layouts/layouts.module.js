import 'angular';

import LayoutConfig from './layouts.config';
import layoutBlankComponent from './blank/layout-blank.component';
import layoutDefaultComponent from './default/layout-default.component';
import layoutProjectComponent from './project/layout-project.component';

angular.module('app.components.layouts', [])
    .config(LayoutConfig.inst())
    .component(layoutBlankComponent.name, layoutBlankComponent)
    .component(layoutDefaultComponent.name, layoutDefaultComponent)
    .component(layoutProjectComponent.name, layoutProjectComponent);