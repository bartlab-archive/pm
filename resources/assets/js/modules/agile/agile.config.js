import InjectableBase from 'base/injectable.base';
import AgileIndexComponent from './components/index/agile-index.component';
import AgileProjectSettingsComponent from './components/project-settings/agile-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider']
    }

    $onInit() {
        this.projectsServiceProvider
            .registerModule({
                url: 'agile.index',
                title: 'Agile',
                name: 'agile',
                enable: false
            })
            .registerSettings({
                url: 'agile',
                name: 'Agile',
                component: AgileProjectSettingsComponent.getName(),
                module: 'agile'
            });

        this.$stateProvider
            .state('agile', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/issues/agile',
                // todo: replace to issue inner parent state
                parent: 'projects.inner',
                component: AgileIndexComponent.getName(),
            })
            .state('agile.index', {
                url: '',
                component: AgileIndexComponent.getName(),
            });
    }

}