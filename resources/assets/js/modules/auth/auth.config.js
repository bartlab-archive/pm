import InjectableBase from 'base/injectable.base';
import authIndexComponent from './components/index/auth-index.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'MainServiceProvider']
    }

    $onInit() {
        this.MainServiceProvider
            .registerAdminMenu({
                name: 'LDAP authentication',
                url: 'auth.index',
                icon: 'lock'
            });

        this.$stateProvider
            .state('auth', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/auth_sources',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('auth.index', {
                url: '',
                component: authIndexComponent.name,
            });
    }

}