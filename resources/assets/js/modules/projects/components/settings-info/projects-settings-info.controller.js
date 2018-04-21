import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {Restangular} project
 */
export default class ProjectsSettingsInfoController extends ControllerBase {

    static get $inject() {
        return ['projectsService'];
    }

    $onInit() {
        //console.log(this.project);
    }

    submit() {
        // this.project.save();
        // this.project.save();
        this.project.save().then(() => {
            // this.ProjectsService.all().one(this.project.identifier).customPUT(this.project).then(()=>{

        });
        // this.ProjectsService
        //     .updateInformation(
        //         this.model.identifier,
        //         _.pick(this.model, [
        //             'name',
        //             'description',
        //             'homepage',
        //             'parent_identifier',
        //             'inherit_members'
        //         ])
        //     )
        //     .then((response) => {
        //
        //       this.$mdToast.show(
        //         this.$mdToast.simple()
        //           .textContent('Project created success')
        //       );
        //        this.$rootScope.$emit('updateProjectInfo');
        //     }).catch((response) => {
        //   this.onError(response)
        // });
    }

}