export default class ProjectsService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(indifier){
        return this.Restangular.all('projects').one(indifier).get();
    }

    getList(params) {
        return this.Restangular.all('projects').getList(params);
    }

}