import ServiceBase from 'base/service.base';

export default class MyService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    account() {
        // return this.Restangular.one('projects', id);
        return this.$http.get(`/api/v1/my/account`);
    }
}