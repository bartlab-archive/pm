import InjectableBase from 'base/injectable.base';
import calendarIndexComponent from './components/index/calendar-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class CalendarConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider']
    }

    $onInit() {
        this.ProjectsServiceProvider.registerModule({
            url: 'calendar.index',
            title: 'Calendar',
            name: 'calendar',
            enable: false
        });

        this.$stateProvider
            .state('calendar', {
                abstract: true,
                data: {
                    access: '@'
                },
                // todo: set parent issue-inner and renname this state (calendar-inner)
                url: '/issues/calendar',
                parent: 'projects.inner',
                component: calendarIndexComponent.name,
            })
            .state('calendar.index', {
                url: '',
                component: calendarIndexComponent.name,
            });
    }

}