export default class FilesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }
    
    getProjectAttachments(indifier) {
        return this.Restangular.one('projects').one('attachments').one(indifier).get();
    }
}