import InjectableBase from 'base/injectable.base';
import boardsListComponent from './components/list/boards-list.component';
import boardsProjectSettingsComponent from './components/project-settings/boards-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class BoardsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider'];
    }

    $onInit() {
        this.ProjectsServiceProvider
            .registerModule({
                url: 'boards-inner.list',
                title: 'Forums',
                name: 'boards',
                enable: false
            })
            .registerSettings({
                url: 'boards',
                name: 'Forums',
                component: boardsProjectSettingsComponent.name,
                module: 'boards'
            });

        this.$stateProvider
            .state('boards-inner', {
                abstract: true,
                url: '/boards',
                parent: 'projects.inner',
            })
            .state('boards-inner.list', {
                url: '',
                component: boardsListComponent.name,
            });
    }

}

