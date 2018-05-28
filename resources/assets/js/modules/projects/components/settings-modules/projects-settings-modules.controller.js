import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} projectsService
 * @property {$rootScope} $rootScope
 */
export default class ProjectsSettingsModulesController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$rootScope', '$scope'];
    }

    $onInit() {
        this.modules = this.projectsService.getModules()
            .filter((module) => !!module.name);

        this.$scope.$watch(() => this.params.modules, (newVal) => {
            this.modules.forEach((module) => {
                module.enable = newVal.some((pModule) => pModule.name === module.name);
            });
        });
    }

    submit() {
        this.projectsService
            .updateModules(
                this.projectsService.getCurrentId(),
                this.modules.map((module) => {
                    return {name: module.name, enable: module.enable};
                })
            )
            .then(() => this.$rootScope.$emit('updateProjectInfo'));
    }

}