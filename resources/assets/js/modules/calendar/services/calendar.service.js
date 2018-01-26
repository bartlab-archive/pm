import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class CalendarService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

}