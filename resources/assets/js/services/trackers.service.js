import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class TrackersService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    $onInit($injector) {
    }

    getAll() {
        return this.Restangular.all('trackers').getList();
    }

}