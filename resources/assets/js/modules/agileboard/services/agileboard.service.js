import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class AgileboardService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    $onInit($injector) {

    }

    getList(params = []) {
        return this.Restangular.all('statuses').getList(params);
    }

    all() {
        return this.Restangular.all('issue_statuses');
    }
}