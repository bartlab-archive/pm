export default class ProjectsListController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.ProjectsService = $injector.get('ProjectsService');
    }

    $onInit() {
        // this.showClosed = 0;
        this.load();
    }

    load() {
        this.list = [];
        this.ProjectsService.getList({closed: this.showClosed}).then((response) => {
            this.list = response.data;
        });
    }

}