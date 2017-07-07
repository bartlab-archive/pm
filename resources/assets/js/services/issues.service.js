export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(indifier) {
        console.log(123);
        return this.Restangular.one('issues').one(indifier).get();
    }

    getListByProject(indifier, params) {
        return this.Restangular.all('projects').one(indifier).one('issues').getList();
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