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
      this.projectsService.put(this.$scope.$$childHead.$ctrl.project).then((response) => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent('Project created success')
        );

        this.$state.reload();
      });

    }

}