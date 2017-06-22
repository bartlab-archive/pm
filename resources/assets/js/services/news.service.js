export default class NewsService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(indifier) {
        return this.Restangular.one('news').one(indifier).get();
    }

    getNews(params) {
        return this.Restangular.all('news').getList(params);
    }
}