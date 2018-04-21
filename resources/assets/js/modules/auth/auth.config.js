import InjectableBase from 'base/injectable.base';
import AuthIndexComponent from './components/index/auth-index.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider']
    }

    $onInit() {
        this.mainServiceProvider
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
                component: AuthIndexComponent.getName(),
            });
    }

}