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

        this.$scope.$watch(() => this.params, (newVal) => {
            if (newVal) {
                this.modules = this.modules.map((module) => {
                    module.enable = newVal.modules.some((pModule) => pModule.name === module.name);
                    return module;
                });
            }
        });
    }

    submit() {
        let data = [];

        this.modules.forEach((module) => {
            data.push({name: module.name, enable: module.enable});
        });

        this.projectsService
            .updateModules(this.projectsService.getCurrentId(), data)
            .then(() => this.$rootScope.$emit('updateProjectInfo'));
    }

}