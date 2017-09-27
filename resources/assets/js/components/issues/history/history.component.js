import HistoryController from './history.controller';
import HistoryTemplate from './history.html';
import './history.scss';

export default {
    name: 'historyComponent',
    controller: HistoryController,
    template: HistoryTemplate,
    bindings: {
        issueId: '=',
        trackers: '=',
        statuses: '=',
        users: '=',
        projects: '=',
        priorities: '=',
        list: '='
    }
};