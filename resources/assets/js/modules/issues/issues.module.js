import 'angular';
import IssuesConfig from './issues.config';
import IssuesService from './services/issues.service';
import IssuesCategoriesService from "./services/issues-categories.service";
import IssuesProjectSettingsComponent from './components/project-settings/issues-project-settings.component';
import IssuesFormComponent from './components/form/issues-form.component';
import IssuesInfoComponent from './components/info/issues-info.component';
import IssuesListComponent from './components/list/issues-list.component';
import IssuesViewComponent from './components/view/issues-view.component';
import IssuesViewActionsComponent from './components/view-actions/issues-view-actions.component';
import IssuesHistoryComponent from './components/history/issues-history.component';
import IssuesCategoryComponent from './components/category/issues-category.component';
import IssuesImportsComponent from './components/imports/issues-imports.component';
import IssuesReportComponent from './components/report/issues-report.component';

angular.module('app.modules.issues', [])
    .config(IssuesConfig.inst())
    .service(IssuesService.getName(), IssuesService)
    .service(IssuesCategoriesService.getName(), IssuesCategoriesService)
    .component(IssuesProjectSettingsComponent.getName(), IssuesProjectSettingsComponent)
    .component(IssuesFormComponent.getName(), IssuesFormComponent)
    .component(IssuesInfoComponent.getName(), IssuesInfoComponent)
    .component(IssuesListComponent.getName(), IssuesListComponent)
    .component(IssuesViewComponent.getName(), IssuesViewComponent)
    .component(IssuesViewActionsComponent.getName(), IssuesViewActionsComponent)
    .component(IssuesImportsComponent.getName(), IssuesImportsComponent)
    .component(IssuesReportComponent.getName(), IssuesReportComponent)
    .component(IssuesHistoryComponent.getName(), IssuesHistoryComponent)
    .component(IssuesCategoryComponent.getName(), IssuesCategoryComponent);
// .component(historyComponent.name, historyComponent);

// todo: make register issues menu, like in project