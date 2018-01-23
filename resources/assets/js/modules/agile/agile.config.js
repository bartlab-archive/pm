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
                url: '/issues/agile',
                parent:'projects.inner',
                component: agileIndexComponent.name,
            })
            .state('agile.index', {
                url: '',
                component: agileIndexComponent.name,
            });
    }

}