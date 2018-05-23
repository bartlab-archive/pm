import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$scope} $scope
 */
export default class ProjectsFormController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$scope', '$state', '$stateParams'];
    }

    $onInit() {
        this.errors = this.errors || {};
        this.$scope.$watch(() => this.errors, () => this.onError());

        if(this.$stateParams.project_id) {
            this.projectsService.one(this.$stateParams.project_id).then((response) => {
               this.project = response.data.data;
            });
        }

        this.projectsService.all().then((response) => {
            this.projects = response.data.data;
        });
    }

    onError() {
        for (let field in this.errors) {
            if (this.form.hasOwnProperty(field)) {
                this.form[field].$touched = true;
                this.form[field].$setValidity('server', false);
            }
        }
    }

    change(field) {
        this.form[field].$setValidity('server', true);
        this.errors[field] = undefined;
    }

}