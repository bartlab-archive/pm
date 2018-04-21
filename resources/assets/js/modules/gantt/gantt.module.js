import 'angular';
import GanttConfig from './gantt.config';
import GanttService from './services/gantt.service';
import GanttIndexComponent from './components/index/gantt-index.component';

angular.module('app.modules.gantt', [])
    .config(GanttConfig.inst())
    .service(GanttService.getName(), GanttService)
    .component(GanttIndexComponent.getName(), GanttIndexComponent);