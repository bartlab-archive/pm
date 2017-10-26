import 'angular';

import WorkflowsConfig from './workflows.config';
import workflowsIndexComponent from './index/workflows-index.component';
import workflowsEditComponent from './edit/workflows-edit.component';

angular.module('app.components.workflows', [])
    .config(WorkflowsConfig.inst())
    .component(workflowsIndexComponent.name, workflowsIndexComponent)
    .component(workflowsEditComponent.name, workflowsEditComponent);