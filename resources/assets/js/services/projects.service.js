import _ from 'lodash';

export default class ProjectsService {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
        this.$cacheFactory = $injector.get('$cacheFactory');
        this.cache = this.$cacheFactory(this.name);
        this.project = {};
    }

    one(identifier) {
        return this.Restangular.all('projects').one(identifier)
            .withHttpConfig({cache: this.cache})
            .get();
    }

    getList(params) {
        return this.Restangular.all('projects').getList(params);
    }

    getMyList() {
        return this.getList().then((response) => {
            return _.filter(response.data, {is_my: 1});
        });
    }

    getNews(identifier, params) {
        return this.Restangular.all('projects').one(identifier).one('news').getList();
    }

    getTrackers(identifier) {
        return this.Restangular.one('projects', identifier).one('trackers')
            // .withHttpConfig({cache: this.cache})
            .get();
    }

    create(params) {
        return this.Restangular.all('projects').post(params);
    }

}