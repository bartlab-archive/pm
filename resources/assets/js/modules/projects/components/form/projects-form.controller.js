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
        this.$scope.$watch(() => this.errors);

        if(this.$stateParams.project_id) {
            this.projectsService.one(this.$stateParams.project_id).then((response) => {
               this.project = response.data.data;
               this.project.parent_identifier = this.project.parent.identifier;
               this.project.prev_identifier = this.project.identifier;
               this.project.new_identifier = this.project.identifier;
            });
        }

        this.projectsService.all().then((response) => {
            this.projects = response.data.data;
        });
    }

}