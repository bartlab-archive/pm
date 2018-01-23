import InjectableBase from 'base/injectable.base';
import agileIndexComponent from './components/index/agile-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('agile', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/agile',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('agile.index', {
                url: '',
                component: agileIndexComponent.name,
            });
    }

}