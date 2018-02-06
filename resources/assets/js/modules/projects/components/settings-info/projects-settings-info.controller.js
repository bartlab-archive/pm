import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 */
export default class ProjectsSettingsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService'];
    }

    $onInit() {

    }

    updateInformation() {
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

    change(field) {
        // this.infoForm[field].$setValidity('server', true);
        // this.errors[field] = undefined;
    }

    onError(response) {
        //
        // if (_.get(response, 'status') === 500) {
        //         this.$mdToast.show(
        //         this.$mdToast.simple().textContent('Server error')
        //     );
        // } else {
        //     this.errors = _.get(response, 'data.errors', {});
        //     for (let field in this.errors) {
        //         if (this.infoForm.hasOwnProperty(field)) {
        //             this.infoForm[field].$touched = true;
        //             this.infoForm[field].$setValidity('server', false);
        //         }
        //     }
        // }
    }

}