import _ from 'lodash';
import moment from 'moment';
import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'IssuesService', '$state', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.project = _.get(response, 'data', []);
            this.project.modules = this.ProjectsService.getModules(this.project.enabled_modules);
            this.members = this.ProjectsService.getMembersList(this.project);
            this.membersByRole = this.getMembersByRole(this.members);
        });

        this.ProjectsService.getProjectIssues(this.$stateParams.project_id).then((response) => {
            this.issuesCount = _.get(response, 'data.trackers', []);
            _.each(this.issuesCount, (v, k) => {
                !v.opened ? v.opened = 0 : null;
                !v.closed ? v.closed = 0 : null;
            });
        });
    }

    getMembersByRole(members) {
        let memberRoles = {};
        _.each(members, (member) => {
            if (memberRoles[member.role]) {
                memberRoles[member.role][member.user_id] = member.name;
            } else {
                memberRoles[member.role] = {};
                memberRoles[member.role][member.user_id] = member.name;
            }
        });

        return memberRoles;
    }

    timeAgo(creationDate) {
        let daysAgo = moment().diff(moment(creationDate, 'YYYY-MM-DD'), 'days');
        const yearsAgo = Math.floor(daysAgo / 365);
        daysAgo -= yearsAgo * 365;
        const monthsAgo = Math.floor(daysAgo / 30);
        daysAgo -= monthsAgo * 30;

        return (yearsAgo ? yearsAgo + ' years ' : '') + (monthsAgo ? monthsAgo + ' months ' : '') + daysAgo + ' days';
    }

    canShowModule(moduleName) {
        return (this.project && typeof this.project.modules[moduleName] !== 'undefined');
    }

    userNavigate(userId) {
        this.$state.go('users.info', {id: userId});
    }

    issueNavigate() {
        this.$state.go('projects.inner.issues.index', {project_id: this.project.identifier});
    }

    projectNavigate(identifier) {
        this.$state.go('projects.inner.info', {project_id: identifier});
    }
}