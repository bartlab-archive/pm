import ServiceBase from 'base/service.base';
import _ from 'lodash';

/**
 * @property {$http} $http
 * @property {StorageService} storageService
 */
export default class AuthService extends ServiceBase {

    static get $inject() {
        return ['$http', 'storageService'];
    }

    $onInit() {
    }

    login(data) {
        return this.$http
            .post(`/api/v1/auth/login`, data)
            .then((response) => {
                const token = _.get(response, 'data.data.value');

                if (token) {
                    this.storageService.setToken(token);
                }

                return response;
            });
    }

    register(data) {
        return this.$http
            .post(`/api/v1/auth/register`, data)
            .then((response) => {
                const token = _.get(response, 'data.data.value');

                if (token) {
                    this.storageService.setToken(token);
                }

                return response;
            });
    }

    logout() {
        this.storageService.removeToken();
    }

    isAuthenticated() {
        return !!this.storageService.getToken();
    }

}