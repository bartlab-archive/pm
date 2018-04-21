import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class ProjectsSettingsModulesController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$rootScope'];
    }

    $onInit() {
    }

    submit() {
        this.projectsService
            .updateModules(this.projectsService.getCurrentId(), this.params.modules.map((module) => {
                delete module['title'];
                return module;
            }))
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}