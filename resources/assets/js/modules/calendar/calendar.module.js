import 'angular';
import  CalendarConfig from './calendar.config';
import  CalendarService from './services/calendar.service';
import  calendarIndexComponent from './components/index/calendar-index.component';

angular.module('app.modules.calendar', [])
    .config(CalendarConfig.inst())
    .service('CalendarService', CalendarService)
    .component(calendarIndexComponent.name, calendarIndexComponent);