import 'angular';

import layoutConfig from './layouts.config';

import layoutBlankCompoent from './blank/layout-blank.component';
import layoutDefaultCompoent from './default/layout-default.component';

angular.module('app.components.layouts', [])
    .config(layoutConfig)
    .component('layoutBlank', layoutBlankCompoent)
    .component('layoutDefault', layoutDefaultCompoent);