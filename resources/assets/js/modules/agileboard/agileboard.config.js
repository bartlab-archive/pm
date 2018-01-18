import InjectableBase from 'base/injectable.base';
import agileboardIndexComponent from './components/index/agileboard-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('agileboard', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/agileboard',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('agileboard.index', {
                url: '',
                component: agileboardIndexComponent.name,
            });
    }

}