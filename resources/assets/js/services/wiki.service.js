export default class WikiService {

  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.Restangular = $injector.get('Restangular');
  }

  getStartPageWiki() {
    return this.Restangular.one('wiki').one('start-page').get();
  }
}