import _ from 'lodash';

export default class ProjectsService {

    static get $inject() {
        return ['$injector'];
    }

    get modules() {
        return [
            {id: 'issue_tracking', name: 'Issue tracking'},
            {id: 'time_tracking', name: 'Time tracking '},
            {id: 'news', name: 'News'},
            {id: 'documents', name: 'Documents'},
            {id: 'files', name: 'Files'},
            {id: 'wiki', name: 'Wiki'},
            {id: 'repository', name: 'Repository'},
            {id: 'boards', name: 'Forums'},
            {id: 'calendar', name: 'Calendar'},
            {id: 'gantt', name: 'Gantt'},
        ];
    }

    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(indifier) {
        return this.Restangular.all('projects').one(indifier).get();
    }

    getList(params) {
        return this.Restangular.all('projects').getList(params);
    }

    getMyList() {
        return this.getList().then((response) => {
            return _.filter(response.data, {is_my: 1});
        });
    }

}