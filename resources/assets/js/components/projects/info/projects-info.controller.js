export default class ProjectsInfoController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.ProjectsService = $injector.get('ProjectsService');
        this.$stateParams = $injector.get('$stateParams');
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.id).then((response) => {
            this.project = response.data;
        });
    }

}