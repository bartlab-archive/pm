import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {Restangular} project
 */
export default class ProjectsSettingsInfoController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$scope', '$mdToast', '$state'];
    }

    $onInit() {
      this.errors = {};
      this.form = null;
    }

    submit() {

      // access child scope
      this.projectsService.update(this.params.data).then((response) => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Project updated successfully')
        );

        this.$state.reload();
      });

    }

}