import 'angular';
import IssuesConfig from './issues.config';
import IssuesService from './services/issues.service';
import issuesEditCopyComponent from './components/edit-copy/issues-edit-copy.component';
import issuesNewComponent from './components/new/issues-new.component';
import issuesInfoComponent from './components/info/issues-info.component';
import issuesListComponent from './components/list/issues-list.component';
import issuesViewComponent from './components/view/issues-view.component';
import issuesViewActionsComponent from './components/view-actions/issues-view-actions.component';
// import historyComponent from './history/history.component';

angular.module('app.modules.issues', [])
    .config(IssuesConfig.inst())
    .service('IssuesService', IssuesService)
    .component(issuesEditCopyComponent.name, issuesEditCopyComponent)
    .component(issuesNewComponent.name, issuesNewComponent)
    .component(issuesInfoComponent.name, issuesInfoComponent)
    .component(issuesListComponent.name, issuesListComponent)
    .component(issuesViewComponent.name, issuesViewComponent)
    .component(issuesViewActionsComponent.name, issuesViewActionsComponent);
// .component(historyComponent.name, historyComponent);