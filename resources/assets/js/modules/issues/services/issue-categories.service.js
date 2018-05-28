import ServiceBase from 'base/service.base';

export default class IssueCategoriesService extends ServiceBase {

  static get $inject() {
    return ['$stateParams', '$http'];
  }

  $onInit($injector) {
  }

  one(identifier) {
    return this.$http.get('/api/v1/issues_categories/' + identifier);
  }

  create(identifier, params) {
    return this.$http.post('/api/v1/issues_categories/' + identifier, params)
  }

}