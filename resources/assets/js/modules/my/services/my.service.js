import ServiceBase from 'base/service.base';

export default class MyService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    account() {
        return this.$http.get(`/api/v1/my/account`);
    }

    update(data) {
        return this.$http.put(`/api/v1/my/account`, data);
    }

    refreshToken(action) {
        return this.$http.post(`/api/v1/my/token`, {action});
    }

    changePassword(data) {
        return this.$http.post(`/api/v1/my/password`, data);
    }

    addEmail(email) {
        return this.$http.post(`/api/v1/my/email`, {email});
    }

    notifyEmail(email, notify) {
        return this.$http.put(`/api/v1/my/email`, {email, notify});
    }

    removeEmail(email) {
        return this.$http.delete(`/api/v1/my/email/${email}`);
    }
}