import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property {$stateParams} $stateParams
 * @property {IssuesService} IssuesService
 * @property {ProjectsService} ProjectsService
 * @property {$window} $window
 * @property {$state} $state
 */
export default class  IssuesWatchController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService'];
    }

    $onInit() {
        this.loadIssue();
    }

    loadIssue() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issue = _.get(response, 'data.issue', {});
            this.watch();

            _.set(
                this.$state,
                'data.layoutDefault.projectId',
                _.get(response, 'data.project.identifier')
            );
        });
    }

    watch() {
        if (this.$state.current.name === 'issues.watch') {
            this.IssuesService.watch(_.pick(this.issue, ['id', 'project_id']))
                .then(() => {
                    this.$stateParams.project_id = this.issue.project.identifier;
                    this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
                });
        } else {
            this.IssuesService.unwatch(_.pick(this.issue, ['id', 'project_id']))
                .then(() => {
                    this.$stateParams.project_id = this.issue.project.identifier;
                    this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: this.issue.id});
            });
        }
    }
}