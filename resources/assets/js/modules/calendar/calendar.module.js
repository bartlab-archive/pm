import 'angular';
import CalendarConfig from './calendar.config';
import CalendarService from './services/calendar.service';
import CalendarIndexComponent from './components/index/calendar-index.component';

angular.module('app.modules.calendar', [])
    .config(CalendarConfig.inst())
    .service(CalendarService.getName(), CalendarService)
    .component(CalendarIndexComponent.getName(), CalendarIndexComponent);