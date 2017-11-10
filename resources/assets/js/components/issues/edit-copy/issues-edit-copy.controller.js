import ControllerBase from 'base/controller.base';
import * as _ from "lodash";
import moment from 'moment';

/**
 * @property {$stateParams} $stateParams
 * @property {IssuesService} IssuesService
 * @property {ProjectsService} ProjectsService
 * @property {$window} $window
 * @property {$state} $state
 * @property {$rootScope} $rootScope
 */

export default class IssuesEditCopyController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService', '$rootScope'];
    }

    $onInit() {
        this.usersList = [];
        this.trackersList = [];
        this.projectsList = [];
        this.statusesList = [];
        this.categoriesList = [];
        this.prioritiesList = [];
        this.cardTitle = (this.$state.current.name === 'issues.copy' ? 'Copy' : 'Edit');

        this.loadIssue();
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issue = _.get(response, 'data.issue', {});
            this.usersList = _.get(response, 'data.project.members', []);
            this.categoriesList = _.get(response, 'data.project.issue_categories', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);
            this.issue.project_id = this.issue.project.id;
            _.set(
                this.$stateParams,
                'project_id',
                _.get(response, 'data.project.identifier')
            );
            this.$rootScope.$emit('updateProjectInfo');
        });

        this.IssuesService.getAdditionalInfo({enumeration_type: 'IssuePriority'}).then((response) => {
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);
            this.trackersList = _.get(response, 'data.trackersList', []);

        });
    }


    saveIssue() {
        if (this.error) {
            return false;
        }

        this.issue.due_date = moment(this.issue.due_date).format('YYYY-MM-DD');
        this.issue.start_date = moment(this.issue.start_date).format('YYYY-MM-DD');

        if (this.$state.current.name === 'issues.copy') {
            this.IssuesService.create(_.pick(this.issue, [
                'tracker_id',
                'project_id',
                'subject',
                'description',
                'due_date',
                'category_id',
                'status_id',
                'assigned_to_id',
                'priority_id',
                'fixed_version_id',
                'author_id',
                'lock_version',
                'start_date',
                'done_ratio',
                'estimated_hours',
                'parent_id',
                'root_id',
                'lft',
                'rgt',
                'is_private',
                'closed_on'
            ])).then((response) => {

                if (this.issue = _.get(response, 'data')) {
                    this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
                }
            });
        } else {
            this.IssuesService.update(this.issue).then((response) => {

                if (_.get(response, 'data')) {
                    this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
                }
            });
        }
    }

    validate() {
        this.error = _.isEmpty(this.issue.subject);
    }

    cancel() {
        this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

}