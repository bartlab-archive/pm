export default class IssuesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }
    one(indifier){
        console.log(123);
        return this.Restangular.one('issues').one(indifier).get();
    }

    getListByProject(indifier, params) {
        return this.Restangular.all('projects/' + indifier + '/issues').getList(params);
    }
    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }
    postUpdate(id, params) {
        return this.Restangular.one('issues/' + id + '/update' ).post(params);
    }
    getInfo(id, project_id){
        return this.Restangular.one('issues/' + id + '/infoedit').getList(project_id);
    }
}