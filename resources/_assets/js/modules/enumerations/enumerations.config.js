import InjectableBase from 'base/injectable.base';
import EnumerationsIndexComponent from './components/index/enumerations-index.component';

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
                name: 'Enumerations',
                url: 'enumerations.index',
                icon: 'list'
            });

        this.$stateProvider
            .state('enumerations', {
                abstract: true,
                data: {
                    access: '!'
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
                component: EnumerationsIndexComponent.getName(),
            });
    }

}