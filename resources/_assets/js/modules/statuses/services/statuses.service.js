import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class StatusesService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    all() {
        return this.$http.get('/api/v1/statuses');
    }

    one(id) {
        return this.$http.get(`/api/v1/statuses/${id}`);
    }

    create(params) {
        return this.$http.post('/api/v1/statuses', params);
    }

    update(id, params) {
        return this.$http.put(`/api/v1/statuses/${id}`, params);
    }

    remove(id) {
        return this.$http.delete(`/api/v1/statuses/${id}`);
    }
}