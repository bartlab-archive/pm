import ServiceBase from 'base/service.base';

export default class EnumerationsService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all(params) {
        return this.$http.get('/api/v1/enumerations', {params});
    }

}