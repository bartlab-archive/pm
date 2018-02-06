import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 */
export default class ProjectsSettingsModulesController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService'];
    }

    $onInit() {

    }

    updateModules() {
        // this.ProjectsService
        //     .updateModules(
        //         this.model.identifier,
        //         _.keys(_.pickBy(this.model.modules, (value, key) => value))
        //     )
        //     .then(() => {
        //         this.$mdToast.show(
        //             this.$mdToast.simple().textContent('Success saved!').position('bottom left')
        //         );
        //         this.$rootScope.$emit('updateProjectInfo');
        //     });
    }

}