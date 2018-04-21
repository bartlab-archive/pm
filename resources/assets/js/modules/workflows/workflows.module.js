import 'angular';
import WorkflowsConfig from './workflows.config';
import WorkflowsIndexComponent from './components/index/workflows-index.component';
import WorkflowsEditComponent from './components/edit/workflows-edit.component';

angular.module('app.modules.workflows', [])
    .config(WorkflowsConfig.inst())
    .component(WorkflowsIndexComponent.getName(), WorkflowsIndexComponent)
    .component(WorkflowsEditComponent.getName(), WorkflowsEditComponent);