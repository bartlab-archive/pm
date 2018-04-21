import 'angular';
import RepositoryConfig from './repository.config';
import RepositoryListComponent from './components/list/repository-list.component';
import RepositoryProjectSettingsComponent from './components/project-settings/repository-project-settings.component';

angular.module('app.modules.repository', [])
    .config(RepositoryConfig.inst())
    .component(RepositoryProjectSettingsComponent.getName(), RepositoryProjectSettingsComponent)
    .component(RepositoryListComponent.getName(), RepositoryListComponent);
