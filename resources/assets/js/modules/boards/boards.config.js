import InjectableBase from 'base/injectable.base';
import BoardsListComponent from './components/list/boards-list.component';
import BoardsProjectSettingsComponent from './components/project-settings/boards-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class BoardsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider
            .registerModule({
                url: 'boards-inner.list',
                title: 'Forums',
                name: 'boards',
                enable: false
            })
            .registerSettings({
                url: 'boards',
                name: 'Forums',
                component: BoardsProjectSettingsComponent.getName(),
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
                component: BoardsListComponent.getName(),
            });
    }

}

