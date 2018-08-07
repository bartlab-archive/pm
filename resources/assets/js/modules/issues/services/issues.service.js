import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class IssuesService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get(`/api/v1/issues/${id}`);
    }

    all(params) {
        return this.$http.get(`/api/v1/issues`, {params});
    }

    create(params) {
        return this.$http.post('/api/v1/issues', params);
    }

    update(id, params) {
        return this.$http.put(`/api/v1/issues/${id}`, params);
    }

    remove(id) {
        return this.$http.delete(`/api/v1/issues/${id}`);
    }

    watch(id) {
        return this.$http.post(`/api/v1/issues/${id}/watch`);
    }

    unwatch(id) {
        return this.$http.delete(`/api/v1/issues/${id}/watch`)
    }
}