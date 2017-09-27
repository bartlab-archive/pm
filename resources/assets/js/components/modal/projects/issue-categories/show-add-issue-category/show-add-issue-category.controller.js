import ControllerBase from 'base/controller.base';


/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class showAddIssueCategoryController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope'];
    }

    $onInit() {
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    createIssueCategory() {
        this.ProjectsService.createIssueCategory(this.identifier, this.issueCategory)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }
}
