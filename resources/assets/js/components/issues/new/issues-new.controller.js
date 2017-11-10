import ControllerBase from 'base/controller.base';
import * as _ from "lodash";
import moment from 'moment';

/**
 * @property {$stateParams} $stateParams
 * @property {IssuesService} IssuesService
 * @property {ProjectsService} ProjectsService
 * @property {$window} $window
 * @property {$state} $state
 */
export default class IssuesNewController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService'];
    }

    $onInit() {

        this.issue = {};
        this.error = true;
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
        this.loadAdditionalInfo();
    }

    loadProject() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.issue.project_id = _.get(response, 'data.id');
            this.usersList = _.get(response, 'data.members', []);
            this.categoriesList = _.get(response, 'data.issue_categories', []);
        });
    }

    loadAdditionalInfo() {
        this.IssuesService.getAdditionalInfo({enumeration_type: 'IssuePriority'}).then((response) => {
            this.trackersList = _.get(response, 'data.trackersList', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);
        });
    }

    create() {
        if (this.error) {
            return false;
        }
        this.issue.due_date = moment(this.issue.due_date).format('YYYY-MM-DD');
        this.issue.start_date = moment(this.issue.start_date).format('YYYY-MM-DD');
        this.IssuesService.create(this.issue).then((response) => {

            if (this.issue = _.get(response, 'data')) {
                this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
            }
        });
    }

    validate() {
        this.error = !this.issue.subject
            || !this.issue.status_id
            || !this.issue.priority_id
            || !this.issue.tracker_id
            || !this.issue.project_id
            || !this.issue.assigned_to_id;
    }

    cancel() {
        this.$state.go('projects.inner.issues.index', {project_id: this.$stateParams.project_id});
    }

}