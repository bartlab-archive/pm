import ControllerBase from 'base/controller.base';
import angular from 'angular';
import * as _ from "lodash";

/**
 * @property $state
 * @property $window
 * @property $showdown
 * @property IssuesService
 * @property $stateParams
 */
export default class IssuesInfoController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService'];
    }

    $onInit() {
        this.showMore = false;
        this.trackersList = [];
        this.statusesList = [];
        this.prioritiesList = [];

        this.loadIssue();
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            // set issue data
            this.issue = _.get(response, 'data.issue', {});

            // set current project id to state data
            _.set(
                this.$state,
                'data.layoutDefault.projectId',
                _.get(response, 'data.project.identifier')
            );

            // load addition info
            this.trackersList = _.get(response, 'data.trackersList', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);

            this.setStatusText(this.issue.status_id);
            this.setTrackerText(this.issue.tracker_id);
            this.setPriorityText(this.issue.priority_id);
        });
    }

    openMoreMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    edit() {
        this.$state.go('issues.edit', {project_id: this.$stateParams.project_id, id: this.issue.id});
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