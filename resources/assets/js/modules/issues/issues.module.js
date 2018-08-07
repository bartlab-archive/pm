import 'angular';
import IssuesConfig from './issues.config';
import IssuesService from './services/issues.service';
import IssuesFormComponent from './components/form/issues-form.component';
import IssuesInfoComponent from './components/info/issues-info.component';
import IssuesListComponent from './components/list/issues-list.component';
import IssuesViewComponent from './components/view/issues-view.component';
import IssuesViewActionsComponent from './components/view-actions/issues-view-actions.component';
import IssuesHistoryComponent from './components/history/issues-history.component';
import IssuesImportsComponent from './components/imports/issues-imports.component';
import IssuesReportComponent from './components/report/issues-report.component';
import IssuesMyAssignedComponent from './components/my-assigned/issues-my-assigned.component';
import IssuesMyReportedComponent from './components/my-reported/issues-my-reported.component';
import IssuesMyWatchedComponent from './components/my-watched/issues-my-watched.component';

angular.module('app.modules.issues', [])
    .config(IssuesConfig.inst())
    .service(IssuesService.getName(), IssuesService)
    .component(IssuesFormComponent.getName(), IssuesFormComponent)
    .component(IssuesInfoComponent.getName(), IssuesInfoComponent)
    .component(IssuesListComponent.getName(), IssuesListComponent)
    .component(IssuesViewComponent.getName(), IssuesViewComponent)
    .component(IssuesViewActionsComponent.getName(), IssuesViewActionsComponent)
    .component(IssuesImportsComponent.getName(), IssuesImportsComponent)
    .component(IssuesReportComponent.getName(), IssuesReportComponent)
    .component(IssuesHistoryComponent.getName(), IssuesHistoryComponent)
    .component(IssuesMyAssignedComponent.getName(), IssuesMyAssignedComponent)
    .component(IssuesMyReportedComponent.getName(), IssuesMyReportedComponent)
    .component(IssuesMyWatchedComponent.getName(), IssuesMyWatchedComponent);

// todo: make register issues menu, like in project