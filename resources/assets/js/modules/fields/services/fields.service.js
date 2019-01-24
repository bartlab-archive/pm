import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class FieldsService extends ServiceBase {

    static get $inject() {
        return [];
    }

    $onInit($injector) {
    }


    all() {
        // return this.Restangular.all('custom_fields');
    }
}