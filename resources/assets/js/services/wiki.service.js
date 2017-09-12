import ServiceBase from "base/service.base";

/**
 * @property {Restangular} Restangular
 */
export default class WikiService extends ServiceBase {

    static get $inject() {
        return ['Restangular'];
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
            .one('new')
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

    deleteWikiPage(indetifire, title){
        return this.Restangular
            .one('projects')
            .one(indetifire)
            .one('wiki')
            .one(title)
            .remove()
    }

}