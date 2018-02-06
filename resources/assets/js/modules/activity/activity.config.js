import InjectableBase from 'base/injectable.base';
import activityListComponent from './components/list/activity-list.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class ActivityConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider', 'MainServiceProvider'];
    }

    $onInit() {
        this.MainServiceProvider
            .registerAppMenu({
                url: 'activity.list',
                name: 'Overall activity',
                icon: 'history'
            });


        this.ProjectsServiceProvider
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
                component: activityListComponent.name,
            })
            .state('activity-inner.list', {
                url: '',
                component: activityListComponent.name,
            });
    }

}

