import 'angular';
import ActivityConfig from "./activity.config";
import ActivityListComponent from './components/list/activity-list.component';

angular.module('app.modules.activity', [])
    .config(ActivityConfig.inst())
    .component(ActivityListComponent.getName(), ActivityListComponent);