import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property {$state} $state
 * @property {$window} $window
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {UsersService} UsersService
 */
export default class IssuesInfoController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService', '$rootScope', 'UsersService', '$mdDialog'];
    }

    $onInit() {
        this.showMore = true;
        this.trackersList = [];
        this.statusesList = [];
        this.prioritiesList = [];

        this.loadIssue();

        this.UsersService.getList({}).then((response) => {
            this.users = _.keyBy(_.get(response, 'data', null), 'id');
        });
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id, {enumeration_type: 'IssuePriority'}).then((response) => {
            // set issue data
            this.issue = _.get(response, 'data.issue', {});

            // set current project id to state data
            _.set(
                this.$stateParams,
                'project_id',
                _.get(response, 'data.project.identifier')
            );

            // load addition info
            this.trackersList = _.keyBy(_.get(response, 'data.trackersList', []), 'id');
            this.projectsList = _.keyBy(_.get(response, 'data.projectsList', []), 'id');
            this.statusesList = _.keyBy(_.get(response, 'data.statusesList', []), 'id');
            this.prioritiesList = _.keyBy(_.get(response, 'data.prioritiesList', []), 'id');

            this.setStatusText(this.issue.status_id);
            this.setTrackerText(this.issue.tracker_id);
            this.setPriorityText(this.issue.priority_id);

            this.$rootScope.$emit('updateProjectInfo');
        });
    }

    openMoreMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    edit() {
        this.$state.go('issues.edit', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

    copy() {
        this.$state.go('issues.copy', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

    watch() {
        this.IssuesService.watch(this.issue.id).then(() => this.issue.watch_state = true);
        //this.$state.go('issues.watch', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

    unwatch() {
        this.IssuesService.unwatch(this.issue.id).then(() => this.issue.watch_state = false);
        //this.$state.go('issues.unwatch', {project_id: this.$stateParams.project_id, id: this.issue.id});
    }

    delete() {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this issue?`)
            .ok('Delete!')
            .cancel('Cancel');
        this.$mdDialog.show(confirm).then(() => {
            this.IssuesService.deleteIssue(this.issue.id).then(() => {
                window.location = 'projects/' + this.issue.project.identifier;
            })
        });
    }

    setStatusText(statusId) {
        let status = _.find(this.statusesList, ['id', +statusId]);
        this.statusText = status ? status.name : '';
    }

    setTrackerText(trackerId) {
        let tracker = _.find(this.trackersList, ['id', +trackerId]);
        this.trackerText = tracker ? tracker.name : '';
    }

    setPriorityText(priorityId) {
        let priority = _.find(this.prioritiesList, ['id', +priorityId]);
        this.priorityText = priority ? priority.name : '';
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }

    closeIssueCard() {
        this.$window.history.back();
    }
}