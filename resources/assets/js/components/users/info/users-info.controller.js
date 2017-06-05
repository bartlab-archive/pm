export default class UsersInfoController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.UsersService = $injector.get('UsersService');
        this.$stateParams = $injector.get('$stateParams');
    }

    $onInit() {
        this.UsersService.one(this.$stateParams.id).then((response) => {
            this.project = response.data;
        });
    }

}