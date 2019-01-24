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
        this.user = undefined;
    }

    setToken(token) {
        localStorage.setItem('token', token);

        return this;
    }

    setUser(user) {
        this.user = user;

        return this;
        // localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserData(name, defaultValue) {
        return _.get(this.getUser(), name, defaultValue);
        // return _.get(JSON.parse(localStorage.getItem('user')), name);
    }

    removeToken() {
        localStorage.removeItem('token');

        return this;
    }

    removeUser() {
        localStorage.removeItem('user');

        return this;
    }

    getTheme() {
        return {
            primary: localStorage.getItem('theme-primary'),
            accent: localStorage.getItem('theme-accent'),
            warn: localStorage.getItem('theme-warn'),
            background: localStorage.getItem('theme-background'),
        };
    }

    setTheme(primary, accent, warn, background) {
        localStorage.setItem('theme-primary', primary);
        localStorage.setItem('theme-accent', accent);
        localStorage.setItem('theme-warn', warn);
        localStorage.setItem('theme-background', background);

        return this;
    }

    resetTheme() {
        localStorage.removeItem('theme-primary');
        localStorage.removeItem('theme-accent');
        localStorage.removeItem('theme-warn');
        localStorage.removeItem('theme-background');

        return this;
    }

}