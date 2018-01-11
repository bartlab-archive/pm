import 'angular';
import WorkflowsConfig from './workflows.config';
import workflowsIndexComponent from './components/index/workflows-index.component';
import workflowsEditComponent from './components/edit/workflows-edit.component';

angular.module('app.modules.workflows', [])
    .config(WorkflowsConfig.inst())
    .component(workflowsIndexComponent.name, workflowsIndexComponent)
    .component(workflowsEditComponent.name, workflowsEditComponent);