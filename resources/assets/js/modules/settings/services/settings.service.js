import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class SettingsService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }


    all() {
        return this.$http.get(`/api/v1/settings`);
    }

    one(name) {
        return this.$http.get(`/api/v1/settings/${name}`);
    }
}