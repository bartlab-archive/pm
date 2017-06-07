export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }
    one(indifier){
        return this.Restangular.one('issues').one(indifier).get();
    }

    getListByProject(indifier) {
        return this.Restangular.all('projects').one(indifier).one('issues').get();
    }
    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }
}