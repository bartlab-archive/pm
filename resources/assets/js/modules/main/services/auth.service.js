import ServiceBase from 'base/service.base';
import _ from 'lodash';

/**
 * @property {$http} $http
 * @property {StorageService} storageService
 */
export default class AuthService extends ServiceBase {

    static get $inject() {
        return ['$http', 'storageService', '$q'];
    }

    $onInit() {
        // this.user = null;
    }

    login(data) {
        return this.$http
            .post(`/api/v1/auth/login`, data)
            .then((response) => {
                const token = _.get(response, 'data.data.value');
                const user = _.get(response, 'data.data.user');

                if (token) {
                    this.storageService.setToken(token);
                }

                if (user) {
                    this.storageService.setUser(user);
                }

                return response;
            });
    }

    register(data) {
        return this.$http
            .post(`/api/v1/auth/register`, data)
            .then((response) => {
                const token = _.get(response, 'data.data.value');
                const user = _.get(response, 'data.data.user');

                if (token) {
                    this.storageService.setToken(token);
                }

                if (user) {
                    this.storageService.setUser(user);
                }

                return response;
            });
    }

    me() {
        let deferred = this.$q.defer();

        if (this.storageService.getUser() !== undefined) {
            deferred.resolve(this.storageService.getUser());
        } else {
            this.$http
                .get(`/api/v1/auth/me`)
                .then((response) => {
                    this.user = _.get(response, 'data.data') || {};

                    if (this.user) {
                        this.storageService.setUser(this.user);
                    }
                })
                .catch(() => {
                    this.logout();
                })
                .finally(() => {
                    deferred.resolve(this.storageService.getUser());
                });
        }

        return deferred.promise;
    }

    logout() {
        this.storageService.removeToken();
        this.storageService.removeUser();
    }

    isAuthenticated() {
        return !!this.storageService.getToken();
    }

    isAdmin() {
        return !!this.storageService.getUserData('request');
    }

}