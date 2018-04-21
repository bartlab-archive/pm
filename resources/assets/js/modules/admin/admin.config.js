import InjectableBase from 'base/injectable.base';
import AdminIndexComponent from './components/index/admin-index.component';
import AdminPluginsComponent from './components/plugins/admin-plugins.component';
import AdminInfoComponent from './components/info/admin-info.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class AdminConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider']
    }

    $onInit() {
        // todo: check user for admin status
        this.mainServiceProvider
            .registerAppMenu({
                url: 'admin.index',
                name: 'Administration',
                icon: 'settings_applications'
            })
            .registerAdminMenu({
                name: 'Plugins',
                url: 'admin.plugins',
                icon: 'extension'
            })
            .registerAdminMenu({
                name: 'Information',
                url: 'admin.info',
                icon: 'info'
            });

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
                component: AdminIndexComponent.getName(),
            })
            .state('admin.plugins', {
                url: '/plugins',
                component: AdminPluginsComponent.getName(),
            })
            .state('admin.info', {
                url: '/info',
                component: AdminInfoComponent.getName(),
            });
    }

}