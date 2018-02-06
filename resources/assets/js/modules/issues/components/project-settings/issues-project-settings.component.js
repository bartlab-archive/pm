import IssuesProjectSettingsController from './issues-project-settings.controller';
import issuesProjectSettingsTemplate from './issues-project-settings.html';

export default {
    name: 'issuesProjectSettingsComponent',
    controller: IssuesProjectSettingsController,
    template: issuesProjectSettingsTemplate,
    bindings:{
        project: '='
    }
};