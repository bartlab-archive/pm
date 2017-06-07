export default class IssuesEditController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.IssuesService = $injector.get('IssuesService');
        this.$stateParams = $injector.get('$stateParams');
    }

    $onInit() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issues = response.data;
        });
    }

}