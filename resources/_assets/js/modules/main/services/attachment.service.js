import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class AttachmentService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit() {
    }

    one(id) {
        return this.$http.get(`/api/v1/attachments/${id}`);
    }

    // all(params) {
    //     return this.$http.get(`/api/v1/attachments`, {params});
    // }

    create(params) {
        return this.$http.post('/api/v1/attachments', params, {
            withCredentials: true,
            headers: {'Content-Type': undefined }, // angular detects content-type
            transformRequest: angular.identity
        });
    }

    update(id, params) {
        return this.$http.put(`/api/v1/attachments/${id}`, params);
    }

    remove(id) {
        return this.$http.delete(`/api/v1/attachments/${id}`);
    }
}