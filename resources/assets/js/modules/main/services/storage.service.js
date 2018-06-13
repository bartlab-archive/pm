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

    getToken() {
        return localStorage.getItem('token');
    }

    removeToken(){
        localStorage.removeItem('token');
    }

    // logout(){
    //     localStorage.removeItem('token');
    // }
    //
    // isAuthenticated(){
    //     return !!this.getToken();
    // }

}