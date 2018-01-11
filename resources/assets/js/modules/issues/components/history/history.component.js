import HistoryController from './history.controller';
import historyTemplate from './history.html';
import './history.scss';

export default {
    name: 'historyComponent',
    controller: HistoryController,
    template: historyTemplate,
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