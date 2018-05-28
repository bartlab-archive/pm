import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {Restangular} project
 */
export default class ProjectsSettingsInfoController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$scope', '$mdToast', '$state','$rootScope'];
    }

    $onInit() {
        this.errors = {};
        this.form = null;
    }

    submit() {
        this.projectsService.update(this.params.data)
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Project updated successfully')
                );

                this.$rootScope.$emit('updateProjectInfo');
            });

    }

}