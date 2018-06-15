import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class AgileService extends ServiceBase {

    static get $inject() {
        return [];
    }

}