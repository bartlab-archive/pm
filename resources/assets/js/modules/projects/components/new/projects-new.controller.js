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
        return ['ProjectsService', 'TrackersService', '$mdToast', '$state', '$stateParams'];
    }

    $onInit() {

        if (this.$state.current.name === 'projects.new') {

          this.cardTitle = 'New project';
          this.projectForm = {};

        } else {

          this.cardTitle = 'Copy project';
          this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.model = _.get(response, 'data', []);

            if (this.model.parent) {
              this.model.parent_identifier = this.model.parent.identifier;
              delete(this.model.parent.identifier);
            }

            this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);
          });

        }

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
        });

        this.modules = this.ProjectsService.modules;

        this.TrackersService.getAll().then((response) => {
            this.trackers = response.data;
        });

        this.errors = {};
    }

    create(redirect) {
        let data = _.cloneDeep(this.model);
        data.modules = _.keys(_.pickBy(data.modules, (value, key) => value));
        data.trackers = _.keys(_.pickBy(data.trackers, (value, key) => value));
        delete(data.parent);
        this.ProjectsService.create(data)
            .then((response) => {

            if (redirect) {
                this.$state.go('projects.inner.settings', {project_id: this.model.identifier});
            }
            else {

              if (this.$state.current.name === 'projects.inner.copy') {
                this.$state.go('admin.projects');
              } else {
                this.$state.reload();
              }
            }
                this.$mdToast.show(
                    this.$mdToast.simple()
                      .textContent('Project created success')
                );
            })
          .catch((response) => this.onError(response));
    }

    onError(response) {

        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});
            for (let field in this.errors) {
                if (this.projectForm.hasOwnProperty(field)) {
                    this.projectForm[field].$touched = true;
                    this.projectForm[field].$setValidity('server', false);
                }
            }
        }
    }

    change(field) {
        this.projectForm[field].$setValidity('server', true);
        this.errors[field] = undefined;
    }

}