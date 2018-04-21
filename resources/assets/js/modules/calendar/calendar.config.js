import InjectableBase from 'base/injectable.base';
import CalendarIndexComponent from './components/index/calendar-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class CalendarConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider']
    }

    $onInit() {
        this.projectsServiceProvider.registerModule({
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
                component: CalendarIndexComponent.getName(),
            })
            .state('calendar.index', {
                url: '',
                component: CalendarIndexComponent.getName(),
            });
    }

}