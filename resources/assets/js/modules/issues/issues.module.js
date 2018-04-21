import 'angular';
import IssuesConfig from './issues.config';
import IssuesService from './services/issues.service';
import IssuesProjectSettingsComponent from './components/project-settings/issues-project-settings.component';
// import issuesEditCopyComponent from './components/edit-copy/issues-edit-copy.component';
import IssuesFormComponent from './components/form/issues-form.component';
import IssuesInfoComponent from './components/info/issues-info.component';
import IssuesListComponent from './components/list/issues-list.component';
import IssuesViewComponent from './components/view/issues-view.component';
import IssuesViewActionsComponent from './components/view-actions/issues-view-actions.component';
// import historyComponent from './history/history.component';
import IssuesCategoryComponent from './components/cetegory/issues-category.component';

angular.module('app.modules.issues', [])
    .config(IssuesConfig.inst())
    .service(IssuesService.getName(), IssuesService)
    .component(IssuesProjectSettingsComponent.getName(), IssuesProjectSettingsComponent)
    // .component(issuesEditCopyComponent.name, issuesEditCopyComponent)
    .component(IssuesFormComponent.getName(), IssuesFormComponent)
    .component(IssuesInfoComponent.getName(), IssuesInfoComponent)
    .component(IssuesListComponent.getName(), IssuesListComponent)
    .component(IssuesViewComponent.getName(), IssuesViewComponent)
    .component(IssuesViewActionsComponent.getName(), IssuesViewActionsComponent)
    .component(IssuesCategoryComponent.getName(), IssuesCategoryComponent);
// .component(historyComponent.name, historyComponent);