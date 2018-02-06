import InjectableBase from 'base/injectable.base';
import fieldsIndexComponent from './components/index/fields-index.component';

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
                name: 'Custom fields',
                url: 'fields.index',
                icon: 'text_fields'
            });

        this.$stateProvider
            .state('fields', {
                abstract: true,
                data: {
                    access: '@'
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
                component: fieldsIndexComponent.name,
            });
    }

}