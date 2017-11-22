import 'angular';

import IssuesConfig from './issues.config';
import issuesEditCopyComponent from './edit-copy/issues-edit-copy.component';
import issuesNewComponent from './new/issues-new.component';
import issuesInfoComponent from './info/issues-info.component';
import issuesListComponent from './list/issues-list.component';
// import historyComponent from './history/history.component';

angular.module('app.components.issues', [])
    .config(IssuesConfig.inst())
    .component(issuesEditCopyComponent.name, issuesEditCopyComponent)
    .component(issuesNewComponent.name, issuesNewComponent)
    .component(issuesInfoComponent.name, issuesInfoComponent)
    .component(issuesListComponent.name, issuesListComponent);
// .component(historyComponent.name, historyComponent);