import IssuesViewActionsController from './issues-view-actions.controller';
import issuesViewActionsTemplate from './issues-view-actions.html';

export default {
    name: 'issuesViewActionsComponent',
    controller: IssuesViewActionsController,
    template: issuesViewActionsTemplate,
    bindings:{
        selectedIssue:'<',
        openButton: '<'
    }
};