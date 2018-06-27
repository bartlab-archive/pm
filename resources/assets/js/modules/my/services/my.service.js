import ServiceBase from 'base/service.base';

export default class MyService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    account() {
        // return this.Restangular.one('projects', id);
        return this.$http.get(`/api/v1/my/account`);
    }

    update(data) {
        return this.$http.put(`/api/v1/my/account`, data);
    }

    refreshToken(action) {
        return this.$http.post(`/api/v1/my/token`, {action});
    }
}