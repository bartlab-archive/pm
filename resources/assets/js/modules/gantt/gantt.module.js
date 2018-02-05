import 'angular';
import  GanttConfig from './gantt.config';
import  GanttService from './services/gantt.service';
import  ganttIndexComponent from './components/index/gantt-index.component';

angular.module('app.modules.gantt', [])
    .config(GanttConfig.inst())
    .service('GanttService', GanttService)
    .component(ganttIndexComponent.name, ganttIndexComponent);