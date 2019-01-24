import ControllerBase from 'base/controller.base';

/*
todo: disable identifier for edit project
 */
/**
 * @property {ProjectsService} ProjectsService
 * @property {$scope} $scope
 */
export default class ProjectsFormController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$scope', '$state', '$stateParams'];
    }

    $onInit() {
        this.isNew = !this.projectsService.getCurrentId();

        this.projectsService.all().then((response) => {
            this.projects = response.data.data;
        });
    }

}