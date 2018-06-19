import ServiceBase from 'base/service.base';
import _ from 'lodash';

/**
 * @property {$http} $http
 */
export default class StorageService extends ServiceBase {

    static get $inject() {
        return [];
    }

    $onInit() {
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserData(name) {
        return _.get(JSON.parse(localStorage.getItem('user')), name);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    removeUser() {
        localStorage.removeItem('user');
    }

    // logout(){
    //     localStorage.removeItem('token');
    // }
    //
    // isAuthenticated(){
    //     return !!this.getToken();
    // }

}