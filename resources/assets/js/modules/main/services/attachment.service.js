import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class AttachmentService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get(`/api/v1/attachments/${id}`);
    }

    // all(params) {
    //     return this.$http.get(`/api/v1/attachments`, {params});
    // }

    create(params, config) {
        return this.$http.post('/api/v1/attachments', params, config);
    }

    update(id, params) {
        return this.$http.put(`/api/v1/attachments/${id}`, params);
    }

    remove(id, params) {
        return this.$http.delete(`/api/v1/attachments/${id}`);
    }
}