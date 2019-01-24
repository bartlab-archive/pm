import ServiceBase from 'base/service.base';

/**
 */
export default class NewsService extends ServiceBase {

    static get $inject() {
        return [];
    }

    one(identifier) {
        // return this.Restangular.one('news', identifier).get();
    }

    // getNews(params = {}) {
        // return this.Restangular.all('news').getList(params);
    // }

}