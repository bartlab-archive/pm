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

    getListByProject(indifier, params) {
        return this.Restangular.all('projects/' + indifier + '/issues').getList(params);
    }
    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }

    update(indifier, params) {
        return this.Restangular.one('issues/' + indifier + '/update' ).one(indifier).post(params);
    }
}