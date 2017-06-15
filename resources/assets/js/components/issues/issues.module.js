import 'angular';

import IssuesConfig from './issues.config';
import issuesEditComponent from './edit/issues-edit.component';
import issuesListComponent from './list/issues-list.component';

angular.module('app.components.issues', [])
    .config(IssuesConfig)
    .component('issuesEditComponent', issuesEditComponent)
    .component('issuesListComponent', issuesListComponent);