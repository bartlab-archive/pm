import ControllerBase from 'base/controller.base';
import _ from 'lodash';

// todo: server validation disabled for checkboxes
/**
 * @property {ProjectsService} projectsService
 * @property {TrackersService} trackersService
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

        // todo: make copy project functional
        // if (this.isCopy) {
        //     this.projectsService.all().get(this.$stateParams.project_id).then((response) => {
        //         this.project = response.data;
                // todo: copy project members, versions info and modules data
                // todo: add checkbox "Send email notifications during the project copy"
            // });
        // }
    }

    create(redirect) {
        // this.projectsService.create(this.project)
        this.projectsService
            .create({
                name: this.project.name,
                description: this.project.description,
                identifier: this.project.identifier,
                homepage: this.project.homepage,
                is_public: this.project.is_public,
                // todo: change field name to parent_id?
                parent_identifier: this.project.parent_identifier,
                inherit_members: this.project.inherit_members,
            })
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Project created success')
                );

                if (redirect || this.isCopy) {
                    this.$state.go('projects.inner.settings', {project_id: response.data.data.identifier});
                } else {
                    this.$state.reload();
                }
            })
            .catch((response) => {
                this.errors = _.get(response, 'data.errors', {});
            });
    }

}