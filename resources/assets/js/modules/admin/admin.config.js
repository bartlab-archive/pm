import InjectableBase from 'base/injectable.base';
import adminIndexComponent from './components/index/admin-index.component';
import adminProjectsComponent from './components/projects/admin-projects.component';
import adminPluginsComponent from './components/plugins/admin-plugins.component';
import adminInfoComponent from './components/info/admin-info.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class AdminConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('admin', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/admin',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('admin.index', {
                url: '',
                component: adminIndexComponent.name,
            })
            .state('admin.projects', {
                url: '/projects',
                component: adminProjectsComponent.name,
            })
            .state('admin.plugins', {
                url: '/plugins',
                component: adminPluginsComponent.name,
            })
            .state('admin.info', {
                url: '/info',
                component: adminInfoComponent.name,
            });
    }

}