import 'angular';

import IssuesConfig from './issues.config';
import issuesEditComponent from './edit/issues-edit.component';
import issuesNewComponent from './new/issues-new.component';
import issuesInfoComponent from './info/issues-info.component';
import issuesListComponent from './list/issues-list.component';

angular.module('app.components.issues', [])
    .config(IssuesConfig.inst())
    .component(issuesEditComponent.name, issuesEditComponent)
    .component(issuesNewComponent.name, issuesNewComponent)
    .component(issuesInfoComponent.name, issuesInfoComponent)
    .component(issuesListComponent.name, issuesListComponent);