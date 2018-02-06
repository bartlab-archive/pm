import InjectableBase from 'base/injectable.base';
import adminIndexComponent from './components/index/admin-index.component';
import adminPluginsComponent from './components/plugins/admin-plugins.component';
import adminInfoComponent from './components/info/admin-info.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class AdminConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'MainServiceProvider']
    }

    $onInit() {
        // todo: check user for admin status
        this.MainServiceProvider
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
                component: adminIndexComponent.name,
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