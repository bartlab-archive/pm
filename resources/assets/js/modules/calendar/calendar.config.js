import InjectableBase from 'base/injectable.base';
import calendarIndexComponent from './components/index/calendar-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class CalendarConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('calendar', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/issues/calendar',
                parent:'projects.inner',
                component: calendarIndexComponent.name,
            })
            .state('calendar.index', {
                url: '',
                component: calendarIndexComponent.name,
            });
    }

}