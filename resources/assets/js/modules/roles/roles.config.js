import InjectableBase from 'base/injectable.base';
import rolesIndexComponent from './components/index/roles-index.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class RolesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'MainServiceProvider']
    }

    $onInit() {
        this.MainServiceProvider
            .registerAdminMenu({
                name: 'Roles and permissions',
                url: 'roles.index',
                icon: 'vpn_key'
            });

        this.$stateProvider
            .state('roles', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/roles',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('roles.index', {
                url: '',
                component: rolesIndexComponent.name,
            });
    }

}