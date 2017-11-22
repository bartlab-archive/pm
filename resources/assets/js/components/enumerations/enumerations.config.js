import InjectableBase from 'base/injectable.base';
import enumerationsIndexComponent from './index/enumerations-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('enumerations', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/enumerations',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('enumerations.index', {
                url: '',
                component: enumerationsIndexComponent.name,
            });
    }

}