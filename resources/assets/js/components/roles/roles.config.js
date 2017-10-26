import InjectableBase from 'base/injectable.base';
import rolesIndexComponent from './index/roles-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class RolesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
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