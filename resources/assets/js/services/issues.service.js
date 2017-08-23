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

    getAdditionalInfo() {
        return this.Restangular.all('issues').one('info')
            .withHttpConfig({cache: this.cache})
            .get();
    }

    getIssuesFilters() {
        return this.Restangular.one('filters').get();
    }

    create(params) {
        return this.Restangular.all('issues').post(params);
    }
}