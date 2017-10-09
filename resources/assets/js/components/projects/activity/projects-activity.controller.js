import ControllerBase from 'base/controller.base';
import moment from 'moment';

export default class ProjectsActivityController extends ControllerBase {

    /**
     * @property {ProjectsService} ProjectsService
     * @property {$stateParams} $stateParams
     * @property {TrackersService} TrackersService
     * @property {UsersService} UsersService
     * @property {IssuesService} IssueService
     * @property {$stateParam} $stateParam
     */
    static get $inject() {
        return ['ProjectsService', 'TrackersService', '$stateParams', 'UsersService', 'IssuesService', '$stateParams'];
    }

    $onInit() {
        this.projectId = this.currentProjectId();
        this.substract = 1;
        this.activities = [];
        this.date = null;
        this.showIssues = 1;
        this.showFiles = 1;
        this.showWiki = 1;
        this.showDocuments = 1;
        this.date = this.$stateParams.end_date ?
            moment(this.$stateParams.end_date, 'YYYY-MM-DD').add(30, 'days') : moment();

        this.ProjectsService.one(this.projectId).then(response => {
            let enabledModules = this.ProjectsService.getModules(_.get(response, 'data.enabled_modules', []));

            if (typeof enabledModules.time_tracking === 'undefined') {
                window.location.href = '/projects/' + this.projectId;
            } else {
                this.getActivity();
            }
        });
    }

    currentProjectId() {
        return _.get(this.$state, 'data.layoutDefault.projectId') || _.get(this.$stateParams, 'project_id');
    }

    getActivity() {

        this.startDate = this.date.subtract(this.substract*30, 'days').format('YYYY-MM-DD');
        this.endDate = this.date.subtract((this.substract - 1)*30, 'days').format('YYYY-MM-DD');

        this.ProjectsService.getActivity(this.projectId, {
            start_date: this.startDate,
            end_date: this.endDate,
            showIssues: this.showIssues,
            showFiles: this.showFiles,
            showWiki: this.showWiki,
            showDocuments: this.showDocuments
        }).then(response => {
            if (response.data) {
                this.activities = response.data.data;
            }
        });
    }

    endDateDisabled() {
        return this.endDate === moment().format('YYYY-MM-DD');
    }

    previous() {
        this.substract++;
        this.getActivity();
    }

    next() {
        this.substract--;
        this.getActivity();
    }

    showDivider(date) {
        if (!this.date) {
            this.date = date;
            return false;
        }

        return true;
    }

    openFiltersMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    getDateRange(){
        return moment(this.startDate , 'YYYY-MM-DD').format('MM/DD/YYYY') + ' to  ' +
            moment(this.endDate , 'YYYY-MM-DD').format('MM/DD/YYYY');
    }
}