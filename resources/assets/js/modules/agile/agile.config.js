import InjectableBase from 'base/injectable.base';
import agileIndexComponent from './components/index/agile-index.component';
import agileProjectSettingsComponent from './components/project-settings/agile-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class FieldsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider']
    }

    $onInit() {
        this.ProjectsServiceProvider
            .registerModule({
                url: 'agile.index',
                title: 'Agile',
                name: 'agile',
                enable: false
            })
            .registerSettings({
                url: 'agile',
                name: 'Agile',
                component: agileProjectSettingsComponent.name,
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
                component: agileIndexComponent.name,
            })
            .state('agile.index', {
                url: '',
                component: agileIndexComponent.name,
            });
    }

}