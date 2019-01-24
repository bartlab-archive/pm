import ServiceBase from 'base/service.base';

export default class RolesService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    // getList(params = []) {
    //     return this.Restangular.all('roles').getList(params);
    // }

    all() {
        return this.$http.get('/api/v1/roles');
        // return this.Restangular.all('roles');
    }

}