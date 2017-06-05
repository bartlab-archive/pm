export default class ProjectsListController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.UsersService = $injector.get('UsersService');
    }

    $onInit() {
        // this.showClosed = 0;
        this.load();
    }

    load() {
        this.list = [];
        this.UsersService.getList({closed: this.showClosed}).then((response) => {
            this.list = response.data;
        });
    }

}