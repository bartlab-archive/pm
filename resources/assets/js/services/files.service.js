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

    //Map example with new promise
    // getProjectAttachments(identifier) {
    //     return this.Restangular
    //         .one('projects')
    //         .one('attachments')
    //         .one(identifier)
    //         .get()
    //         .then((response) => {
    //             response.data = this.transformData(response.data);
    //             return new Promise((resolve, reject) => { return resolve(response)} );
    //
    //         });
    // }

    //Map example with async await
    // async getProjectAttachments(identifier) {
    //     let p = await this.Restangular
    //         .one('projects')
    //         .one('attachments')
    //         .one(identifier)
    //         .get();
    //     p.data = this.transformData(p.data);
    //     return p;
    // }

    // transformData(data) {
    //     return data.map((item) => {
    //         item.created_on = 'test';
    //         return item;
    //     });
    // }

}