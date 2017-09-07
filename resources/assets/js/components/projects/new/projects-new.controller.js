import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$mdToast} $mdToast
 * @property {$state} $state
 */
export default class ProjectsNewController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$mdToast', '$state'];
    }

    $onInit() {
        this.modules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
        });

        this.errors = {};
        this.projectForm = {};
    }

    createProject(state, stateData) {
        this.ProjectsService.create(this.model)
            .then((response) => {
            console.log(state, stateData);
                this.$state.go(state, stateData);
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