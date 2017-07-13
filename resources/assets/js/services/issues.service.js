export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(identifier) {
        return this.Restangular.one('issues').one(identifier).get();
    }

    getListByProject(identifier, params) {
        return this.Restangular.all('projects').one(identifier).one('issues').getList();
    }

    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }

    postUpdate(id, params) {
        return this.Restangular.one('issues').one(id).put(null, params);
    }

    getInfo(id, project_id) {
        return this.Restangular.one('issues/' + id + '/infoedit').getList(project_id);
    }
}