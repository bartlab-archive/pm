import InjectableBase from 'base/injectable.base';
import SettingsIndexComponent from './components/index/settings-index.component';

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
                name: 'Settings',
                url: 'settings.index',
                icon: 'settings'
            });

        this.$stateProvider
            .state('settings', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/settings',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('settings.index', {
                url: '/{page}',
                params: {
                    page: {
                        value: null,
                        squash: true,
                        dynamic: true
                    }
                },
                component: SettingsIndexComponent.getName(),
            });
    }

}