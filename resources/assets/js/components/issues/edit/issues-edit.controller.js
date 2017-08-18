import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $stateParams
 * @property IssuesService
 * @property ProjectsService
 * @property $window
 * @property $state
 */

export default class IssuesEditController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService'];
    }

    $onInit() {
        
        this.usersList = [];
        this.trackersList = [];
        this.projectsList = [];
        this.statusesList = [];
        this.categoriesList = [];
        this.prioritiesList = [];

        this.init();
    }

    init() {
        this.loadProject();
        this.loadIssue();
    }

    loadProject() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.usersList = _.get(response, 'data.users', []);
            this.categoriesList = _.get(response, 'data.issue_categories', []);
        });
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issue = _.get(response, 'data', {});
            this.loadAdditionalInfo();
        });
    }

    loadAdditionalInfo() {
        this.IssuesService.getAdditionalInfo().then((response) => {
            this.trackersList = _.get(response, 'data.trackersList', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);
        });
    }

    updateIssue() {
        if (this.error) {
            return false;
        }

        this.issue.put().then((response) => {

            if (_.get(response, 'data')) {
                this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
            }
        });
    }

    validate() {
        this.error = _.isEmpty(this.issue.subject);
    }

    cancel() {
        this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

}