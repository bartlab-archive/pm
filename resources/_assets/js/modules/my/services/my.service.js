import InjectableBase from "base/injectable.base";

/**
 * @property {object} modules
 */
export default class MyService extends InjectableBase {

    static get $inject() {
        return ['$http'];
    }

    getModules() {
        return this.modules.map((item) => Object.assign({}, item));
    }

    account() {
        return this.$http.get(`/api/v1/account`);
    }

    update(data) {
        return this.$http.put(`/api/v1/account`, data);
    }

    refreshToken(action) {
        return this.$http.post(`/api/v1/account/token`, {action});
    }

    changePassword(data) {
        return this.$http.post(`/api/v1/account/password`, data);
    }

    addEmail(email) {
        return this.$http.post(`/api/v1/account/email`, {email});
    }

    notifyEmail(email, notify) {
        return this.$http.put(`/api/v1/account/email`, {email, notify});
    }

    removeEmail(email) {
        return this.$http.delete(`/api/v1/account/email/${email}`);
    }
}