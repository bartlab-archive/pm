import _ from 'lodash';
import ServiceBase from "base/service.base";

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class EnumerationsService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    $onInit($injector) {
        // this.cache = this.$cacheFactory(this.name);
        // this.project = {};
    }

    getList(params) {
        return this.Restangular.all('enumerations').getList(params);
    }
}