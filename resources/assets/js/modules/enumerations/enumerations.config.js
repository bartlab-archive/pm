import InjectableBase from 'base/injectable.base';
import enumerationsIndexComponent from './components/index/enumerations-index.component';

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
                name: 'Enumerations',
                url: 'enumerations.index',
                icon: 'list'
            });

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