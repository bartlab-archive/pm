export default class ProjectsService {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector){
        this.Restangular = $injector.get('Restangular');
    }

    getList(){
        return this.Restangular.all('projects').getList();
    }

}