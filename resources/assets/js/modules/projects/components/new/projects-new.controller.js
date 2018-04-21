import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {ProjectsService} ProjectsService
 * @property {TrackersService} TrackersService
 * @property {$mdToast} $mdToast
 * @property {$state} $state
 */
export default class ProjectsNewController extends ControllerBase {

    static get $inject() {
        return ['projectsService', 'trackersService', '$mdToast', '$state', '$stateParams'];
    }

    $onInit() {
        this.errors = {};
        this.form = null;
        this.isCopy = this.$state.current.name === 'projects.inner.copy';

        if (this.isCopy) {
            this.projectsService.all().get(this.$stateParams.project_id).then((response) => {
                this.project = response.data;
                // todo: copy project members, versions info and modules data
                // todo: add checkbox "Send email notifications during the project copy"
            });
        }
    }

    create(redirect) {
        this.projectsService.all().post(this.project)
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Project created success')
                );

                if (redirect || this.isCopy) {
                    this.$state.go('projects.inner.settings', {project_id: response.data.identifier});
                } else {
                    this.$state.reload();
                }
            })
            .catch((response) => {
                this.errors = _.get(response, 'data.errors', {});
                // for (let field in this.errors) {
                //     if (this.form.hasOwnProperty(field)) {
                //         this.form[field].$touched = true;
                //         this.form[field].$setValidity('server', false);
                //     }
                // }
            });
        // let data = _.cloneDeep(this.model);
        // data.modules = _.keys(_.pickBy(data.modules, (value, key) => value));
        // data.trackers = _.keys(_.pickBy(data.trackers, (value, key) => value));
        // delete(data.parent);
        // this.ProjectsService.create(data)
        //     .then((response) => {
        //
        //         if (redirect) {
        //             this.$state.go('projects.inner.settings', {project_id: this.model.identifier});
        //         }
        //         else {
        //
        //             if (this.$state.current.name === 'projects.inner.copy') {
        //                 this.$state.go('admin.projects');
        //             } else {
        //                 this.$state.reload();
        //             }
        //         }
        //         this.$mdToast.show(
        //             this.$mdToast.simple()
        //                 .textContent('Project created success')
        //         );
        //     })
        //     .catch((response) => this.onError(response));
    }

    // onError(response) {
        // if (_.get(response, 'status') === 500) {
        //     this.$mdToast.show(
        //         this.$mdToast.simple().textContent('Server error')
        //     );
        // } else {
        //     this.errors = _.get(response, 'data.errors', {});
        //     for (let field in this.errors) {
        //         if (this.form.hasOwnProperty(field)) {
        //             this.form[field].$touched = true;
        //             this.form[field].$setValidity('server', false);
        //         }
        //     }
        // }
    // }
    //
    // change(field) {
    //     this.projectForm[field].$setValidity('server', true);
    //     this.errors[field] = undefined;
    // }

}