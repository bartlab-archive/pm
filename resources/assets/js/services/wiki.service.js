export default class WikiService {

  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.Restangular = $injector.get('Restangular');
  }

  getStartPageWiki(indetifire) {
    return this.Restangular
      .one('projects')
      .one(indetifire)
      .one('wiki')
      .get();
  }
}