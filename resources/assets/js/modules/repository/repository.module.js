import 'angular';
import RepositoryConfig from './repository.config';
import repositoryListComponent from './components/list/repository-list.component';
import repositoryProjectSettingsComponent from './components/project-settings/repository-project-settings.component';

angular.module('app.modules.repository', [])
    .config(RepositoryConfig.inst())
    .component(repositoryProjectSettingsComponent.name, repositoryProjectSettingsComponent)
    .component(repositoryListComponent.name, repositoryListComponent);
