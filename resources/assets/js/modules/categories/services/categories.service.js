import ServiceBase from 'base/service.base';

/**
 * @property {$http} $http
 */
export default class CategoriesService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get(`/api/v1/categories/${id}`);
    }

    all(identifier) {
        return this.$http.get(`/api/v1/projects/${identifier}/categories`);
    }

    create(identifier, params) {
        return this.$http.post(`/api/v1/projects/${identifier}/categories`, params)
    }

    update(id, params) {
        return this.$http.put(`/api/v1/categories/${id}`, params)
    }

    remove(id) {
        return this.$http.delete(`/api/v1/categories/${id}`);
    }
}