export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(identifier) {
        // return this.Restangular.one('issues').one(identifier).get();
        return this.Restangular.one('issues', identifier).get();
    }

    getListByProject(identifier, params) {
        return this.Restangular.one('projects', identifier).all('issues').post(params);
    }

    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }

    postUpdate(id, params) {
        // return this.Restangular.one('issues').one(id).put(null, params);
        return this.Restangular.one('issues', id).put(null, params);
    }

    getInfo(id, project_id) {
        return this.Restangular.one('issues', id).one('infoedit').getList(project_id);
    }

    getIssuesFilters() {
        return this.Restangular.one('filters').get();
    }
}