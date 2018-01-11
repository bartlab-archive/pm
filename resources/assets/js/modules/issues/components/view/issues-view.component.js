import IssuesViewController from './issues-view.controller';
import issuesViewTemplate from './issues-view.html';
import './issues-view.scss';

export default {
    name: 'issuesViewComponent',
    controller: IssuesViewController,
    template: issuesViewTemplate,
    bindings:{
        selectedIssue:'<',
        authorInfo: '<'
    }
};