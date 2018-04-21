import InjectableBase from 'base/injectable.base';
import RepositoryListComponent from './components/list/repository-list.component';
import RepositoryProjectSettingsComponent from './components/project-settings/repository-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class RepositoryConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider
            .registerModule({
                url: 'repository-inner.list',
                title: 'Repository',
                name: 'repository',
                enable: false
            })
            .registerSettings({
                url: 'repositories',
                name: 'Repositories',
                component: RepositoryProjectSettingsComponent.getName(),
                module: 'repository'
            });

        this.$stateProvider
            .state('repository-inner', {
                abstract: true,
                url: '/repository',
                parent: 'projects.inner',
            })
            .state('repository-inner.list', {
                url: '',
                component: RepositoryListComponent.getName(),
            });
    }

}