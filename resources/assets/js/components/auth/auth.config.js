import InjectableBase from 'base/injectable.base';
import authIndexComponent from './index/auth-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
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