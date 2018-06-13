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
                const token = _.get(response, 'data.token');

                if (token) {
                    this.storageService.setToken(token);
                }

                return response;
            });
    }

    // setToken(token) {
    //     localStorage.setItem('token', token);
    // }
    //
    // getToken() {
    //     return localStorage.getItem('token');
    // }

    logout() {
        this.storageService.removeToken();
    }

    isAuthenticated() {
        return !!this.storageService.getToken();
    }

}