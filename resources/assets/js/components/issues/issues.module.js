import 'angular';

import IssuesConfig from './issues.config';
import IssuesRun from './issues.run';
import issuesEditCopyComponent from './edit-copy/issues-edit-copy.component';
import issuesNewComponent from './new/issues-new.component';
import issuesInfoComponent from './info/issues-info.component';
import issuesListComponent from './list/issues-list.component';
import issuesViewComponent from './view/issues-view.component';
import issuesViewActionsComponent from './view-actions/issues-view-actions.component';
// import historyComponent from './history/history.component';

angular.module('app.components.issues', [])
    .config(IssuesConfig.inst())
    .run(IssuesRun.inst())
    .component(issuesEditCopyComponent.name, issuesEditCopyComponent)
    .component(issuesNewComponent.name, issuesNewComponent)
    .component(issuesInfoComponent.name, issuesInfoComponent)
    .component(issuesListComponent.name, issuesListComponent)
    .component(issuesViewComponent.name, issuesViewComponent)
    .component(issuesViewActionsComponent.name, issuesViewActionsComponent);
// .component(historyComponent.name, historyComponent);