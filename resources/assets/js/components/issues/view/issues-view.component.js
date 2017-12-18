import IssuesViewController from './issues-view.controller';
import issuesViewTemplate from './issues-view.html';

export default {
    name: 'issuesViewComponent',
    controller: IssuesViewController,
    template: issuesViewTemplate,
    bindings:{
        selectedIssue:'<'
    }
};