import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 */
export default class WikisService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all(indetifire) {
        return this.$http.get('/api/v1/wikis/' + indetifire);
    }

    one(indetifire, name = undefined) {
        return this.$http.get('/api/v1/wikis/' + indetifire + (name ? '/' + name : ''));
    }

    create(indetifire, data) {
        return this.$http.post('/api/v1/wikis/' + indetifire, data);
    }

    update(indetifire, name, data) {
        return this.$http.put('/api/v1/wikis/' + indetifire + '/' + name, data);
    }

    // getStartPageWiki(indetifire) {
    //     return this.Restangular
    //         .one('projects')
    //         .one(indetifire)
    //         .one('wiki')
    //         .get();
    // }
    //
    // getPageWiki(indetifire, title) {
    //     return this.Restangular
    //         .one('projects')
    //         .one(indetifire)
    //         .one('wiki')
    //         .one(title)
    //         .get();
    // }
    //
    // addNewWikiPage(indetifire, params) {
    //     return this.Restangular
    //         .one('projects')
    //         .one(indetifire)
    //         .one('new')
    //         .post(null, params);
    // }
    //
    // getAllWikiPage(indetifire) {
    //     return this.Restangular
    //         .one('projects')
    //         .one(indetifire)
    //         .one('wiki')
    //         .one('all')
    //         .get();
    // }
    //
    // deleteWikiPage(indetifire, title) {
    //     return this.Restangular
    //         .one('projects')
    //         .one(indetifire)
    //         .one('wiki')
    //         .one(title)
    //         .remove()
    // }

}