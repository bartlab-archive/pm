import 'angular';
import ActivityConfig from "./activity.config";
import activityListComponent from './components/list/activity-list.component';

angular.module('app.modules.activity', [])
    .config(ActivityConfig.inst())
    .component(activityListComponent.name, activityListComponent);