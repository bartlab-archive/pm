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
        return ['ProjectsService', 'TrackersService', '$mdToast', '$state'];
    }

    $onInit() {
        this.modules = this.ProjectsService.modules;

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
        });

        this.TrackersService.getAll().then((response) => {
            this.trackers = response.data;
        });

        this.errors = {};
        this.projectForm = {};
    }

    createProjectAndContinue() {
        let data = _.cloneDeep(this.model);
        data.modules = _.keys(_.pickBy(data.modules, (value, key) => value));
        data.trackers = _.keys(_.pickBy(data.trakers, (value, key) => value));

        this.ProjectsService.create(data)
            .then((response) => {
                this.$state.go('projects.inner.settings', {project_id: this.model.identifier});
            })
            .catch((response) => this.onError(response));
    }

    createProject() {
        let data = _.cloneDeep(this.model);
        data.modules = _.keys(_.pickBy(data.modules, (value, key) => value));
        data.trackers = _.keys(_.pickBy(data.trackers, (value, key) => value));

        this.ProjectsService.create(data)
            .then((response) => {
                this.$state.reload();
            })
            .catch((response) => this.onError(response));
    }

    onError(response) {

        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data', {});
            for (let field in this.errors) {
                if (this.projectForm.hasOwnProperty(field)) {
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