import 'angular';
import IssuesConfig from './issues.config';
import IssuesService from './services/issues.service';
import issuesProjectSettingsComponent from './components/project-settings/issues-project-settings.component';
// import issuesEditCopyComponent from './components/edit-copy/issues-edit-copy.component';
import issuesFormComponent from './components/form/issues-form.component';
import issuesInfoComponent from './components/info/issues-info.component';
import issuesListComponent from './components/list/issues-list.component';
import issuesViewComponent from './components/view/issues-view.component';
import issuesViewActionsComponent from './components/view-actions/issues-view-actions.component';
// import historyComponent from './history/history.component';
import issuesCategoryComponent from './components/cetegory/issues-category.component';

angular.module('app.modules.issues', [])
    .config(IssuesConfig.inst())
    .service('IssuesService', IssuesService)
    .component(issuesProjectSettingsComponent.name, issuesProjectSettingsComponent)
    // .component(issuesEditCopyComponent.name, issuesEditCopyComponent)
    .component(issuesFormComponent.name, issuesFormComponent)
    .component(issuesInfoComponent.name, issuesInfoComponent)
    .component(issuesListComponent.name, issuesListComponent)
    .component(issuesViewComponent.name, issuesViewComponent)
    .component(issuesViewActionsComponent.name, issuesViewActionsComponent)
    .component(issuesCategoryComponent.name, issuesCategoryComponent);
// .component(historyComponent.name, historyComponent);