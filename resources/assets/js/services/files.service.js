export default class FilesService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    getProjectAttachments(identifier) {
            return this.Restangular
                .one('projects')
                .one('attachments')
                .one(identifier)
                .get();
        }

    delete(id){
        return this.Restangular.one('projects')
            .one('attachments')
            .one(String(id))
            .remove();
    }
    
    getProjectAttachment(id){
        return this.Restangular
            .one('projects')
            .one('attachments')
            .one('download')
            .one(String(id)).withHttpConfig({responseType: 'arraybuffer'})
            .get({}, {});
    }
    
}