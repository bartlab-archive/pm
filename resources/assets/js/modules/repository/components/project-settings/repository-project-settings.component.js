import RepositoryProjectSettingsController from './repository-project-settings.controller';
import repositoryProjectSettingsTemplate from './repository-project-settings.html';

export default {
    name: 'repositoryProjectSettingsComponent',
    controller: RepositoryProjectSettingsController,
    template: repositoryProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};