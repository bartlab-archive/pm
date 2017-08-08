export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
        this.$cacheFactory = $injector.get('$cacheFactory');
        this.cache = this.$cacheFactory('IssuesService');
    }

    one(identifier) {
        return this.Restangular.one('issues', identifier).get();
    }

    getListByProject(identifier, params) {
        return this.Restangular.one('projects', identifier).all('issues').post(params);
    }

    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }

    getAdditionalInfo(id) {
        return this.Restangular.all('issues').one(id, 'info').withHttpConfig({cache: this.cache}).get();
    }

    postUpdate(id, params) {
        // return this.Restangular.one('issues').one(id).put(null, params);
        return this.Restangular.one('issues', id).put(null, params);
    }

    getInfo(id, project_id) {
        return this.Restangular.one('issues', id).one('infoedit', project_id).get();
    }

    getIssuesFilters() {
        return this.Restangular.one('filters').get();
    }

    getCount($identifier) {
        return this.Restangular.all('issues').one('count', $identifier).get();
    }
}