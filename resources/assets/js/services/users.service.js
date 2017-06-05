export default class UsersService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.Restangular = $injector.get('Restangular');
    }

    one(indifier) {
        return this.Restangular.all('users').one(indifier).get();
    }

    getList(params) {
        return this.Restangular.all('users').getList(params);
    }

}