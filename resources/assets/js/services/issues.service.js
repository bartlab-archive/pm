import ServiceBase from "base/service.base";

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class IssuesService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    $onInit($injector) {
        this.cache = this.$cacheFactory(IssuesService.name);
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

    update(issue) {
        return this.Restangular.all('issues').customPUT(issue, issue.id);
    }
}