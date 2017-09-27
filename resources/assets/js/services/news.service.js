import ServiceBase from "base/service.base";

/**
 * @property {Restangular} Restangular
 */
export default class NewsService extends ServiceBase {

    static get $inject() {
        return ['Restangular'];
    }

    one(identifier) {
        return this.Restangular.one('news', identifier).get();
    }

    getNews(params = {}) {
        return this.Restangular.all('news').getList(params);
    }
}