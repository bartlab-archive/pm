import InjectableBase from 'base/injectable.base';
import ActivityListComponent from './components/list/activity-list.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class ActivityConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAppMenu({
                url: 'activity.list',
                name: 'Overall activity',
                icon: 'access_time'
            });


        this.projectsServiceProvider
            .registerModule({
                url: 'activity-inner.list',
                title: 'Activity',
                enable: true
            });

        this.$stateProvider
            .state('activity', {
                abstract: true,
                url: '/activity',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('activity-inner', {
                abstract: true,
                url: '/activity',
                parent: 'projects.inner',
            })
            .state('activity.list', {
                url: '',
                component: ActivityListComponent.getName(),
            })
            .state('activity-inner.list', {
                url: '',
                component: ActivityListComponent.getName(),
            });
    }

}

