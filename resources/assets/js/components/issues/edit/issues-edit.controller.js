import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $stateParams
 * @property IssuesService
 * @property ProjectsService
 * @property $window
 */

export default class IssuesEditController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$stateParams', '$window', 'ProjectsService'];
    }

    $onInit() {
        this.showMore = false;
        this.usersList = [];
        this.trackersList = [];
        this.projectsList = [];
        this.statusesList = [];
        this.categoriesList = [];
        this.prioritiesList = [];

        this.init();
    }

    init() {
        this.loadAdditionalInfo();
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
            this.setStatusText(response.data.status_id);
            this.setTrackerText(response.data.tracker_id);
        });
    }

    loadAdditionalInfo() {
        this.IssuesService.getAdditionalInfo(this.$stateParams.id).then((response) => {
            this.trackersList = _.get(response, 'data.trackersList', []);
            this.projectsList = _.get(response, 'data.projectsList', []);
            this.statusesList = _.get(response, 'data.statusesList', []);
            this.prioritiesList = _.get(response, 'data.prioritiesList', []);
        });
    }

    openMoreMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    openEditForm() {
        this.editIsOpen = true;
        this.originalIssue = _.cloneDeep(this.issue);
        this.info = {};
        // this.IssuesService.getInfo(this.$stateParams.id, this.edit_issue.project_id).then((response) => {
        //     this.info = response.data[0];
        //     console.log(this.info);
        // });
    }

    updateIssue() {
        if (this.error) {
            return false;
        }

        this.issue.put().then((response) => {
            this.editIsOpen = false;
            this.setStatusText(response.data.status_id);
            this.setTrackerText(response.data.tracker_id);
        });
    }

    validate() {
        this.error = _.isEmpty(this.issue.subject);
    }

    cancel() {
        this.editIsOpen = false;
        this.issue = _.cloneDeep(this.originalIssue);
    }

    setStatusText(statusId) {
        let status = _.find(this.statusesList, ['id', +statusId]);
        this.statusText = status ? status.name : '';
    }

    setTrackerText(trackerId) {
        let tracker = _.find(this.trackersList, ['id', +trackerId]);
        this.trackerText = tracker ? tracker.name : '';
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }

    closeIssueCard() {
        this.$window.history.back();
    }

}