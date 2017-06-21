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

    getPageWiki(indetifire, title) {
        return this.Restangular
            .one('projects')
            .one(indetifire)
            .one('wiki')
            .one(title)
            .get();
    }

    addNewWikiPage(indetifire, params) {
        return this.Restangular
            .one('projects')
            .one(indetifire)
            .one('new-page')
            .post(null, params);
    }

    getAllWikiPage(indetifire) {
        return this.Restangular
            .one('projects')
            .one(indetifire)
            .one('wiki')
            .one('all')
            .get();
    }
}