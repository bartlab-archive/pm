export default class NewsService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(identifier) {
        return this.Restangular.one('news', identifier).get();
    }

    getNews(params = {}) {
        return this.Restangular.all('news').getList(params);
    }
}