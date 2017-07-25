import 'angular';

import LayoutConfig from './layouts.config';
import layoutBlankComponent from './blank/layout-blank.component';
import layoutDefaultComponent from './default/layout-default.component';
import layoutProjectComponent from './project/layout-project.component';
import ProjectMenuComponent from './default/project-menu/project-menu.component';

angular.module('app.components.layouts', [])
    .config(LayoutConfig.inst())
    .component(layoutBlankComponent.name, layoutBlankComponent)
    .component(layoutDefaultComponent.name, layoutDefaultComponent)
    .component(layoutProjectComponent.name, layoutProjectComponent)
    .component(ProjectMenuComponent.name, ProjectMenuComponent);