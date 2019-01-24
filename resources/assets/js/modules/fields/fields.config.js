import InjectableBase from 'base/injectable.base';
import FieldsIndexComponent from './components/index/fields-index.component';

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
                name: 'Custom fields',
                url: 'fields.index',
                icon: 'text_fields'
            });

        this.$stateProvider
            .state('fields', {
                abstract: true,
                data: {
                    access: '!'
                },
                url: '/custom_fields',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('fields.index', {
                url: '',
                component: FieldsIndexComponent.getName(),
            });
    }

}