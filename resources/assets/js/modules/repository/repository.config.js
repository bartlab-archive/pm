import InjectableBase from 'base/injectable.base';
import repositoryListComponent from './components/list/repository-list.component';
import repositoryProjectSettingsComponent from './components/project-settings/repository-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class RepositoryConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider'];
    }

    $onInit() {
        this.ProjectsServiceProvider
            .registerModule({
                url: 'repository-inner.list',
                title: 'Repository',
                name: 'repository',
                enable: false
            })
            .registerSettings({
                url: 'repositories',
                name: 'Repositories',
                component: repositoryProjectSettingsComponent.name,
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
                component: repositoryListComponent.name,
            });
    }

}