import ServiceBase from 'base/service.base';

export default class IssuesCategoriesService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get('/api/v1/issues_categories/' + id);
    }

    create(identifier, params) {
        return this.$http.post('/api/v1/issues_categories/' + identifier, params)
    }

    update(id, params) {
      return this.$http.put('/api/v1/issues_categories/' + id, params)
    }

    listByProject(identifier) {
      return this.$http.get('/api/v1/issues_categories/' + identifier);
    }

    delete(id) {
      return this.$http.delete('/api/v1/issues_categories/' + id);
    }

}