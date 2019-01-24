import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 */
export default class FilesService extends ServiceBase {

    static get $inject() {
        return [];
    }

    getProjectAttachments(identifier) {
        // return this.Restangular
        //     .one('projects')
        //     .one('attachments')
        //     .one(identifier)
        //     .get();
    }

    delete(id) {
        // return this.Restangular.one('projects')
        //     .one('attachments')
        //     .one(String(id))
        //     .remove();
    }

    getProjectAttachment(id) {
        // return this.Restangular
        //     .one('projects')
        //     .one('attachments')
        //     .one('download')
        //     .one(String(id)).withHttpConfig({responseType: 'arraybuffer'})
        //     .get({}, {});
    }

}