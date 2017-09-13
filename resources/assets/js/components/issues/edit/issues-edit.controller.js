import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property {$stateParams} $stateParams
 * @property {IssuesService} IssuesService
 * @property {ProjectsService} ProjectsService
 * @property {$window} $window
 * @property {$state} $state
 * @property {$rootScope} $rootScope
 */

export default class IssuesEditController extends ControllerBase {

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

        this.loadIssue();
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issue = _.get(response, 'data.issue', {});
            this.usersList = _.get(response, 'data.project.members', []);
            this.categoriesList = _.get(response, 'data.project.issue_categories', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);

            _.set(
                this.$state,
                'data.layoutDefault.projectId',
                _.get(response, 'data.project.identifier')
            );
            this.$rootScope.$emit('updateProjectInfo');
        });
        this.IssuesService.getAdditionalInfo({enumeration_type: 'IssuePriority'}).then((response) => {
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);
            this.trackersList = _.get(response, 'data.trackersList', []);

        });
    }


    updateIssue() {
        if (this.error) {
            return false;
        }

        this.IssuesService.update(this.issue).then((response) => {

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