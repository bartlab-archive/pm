import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class ShowEditIssueCategoryController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope'];
    }

    $onInit() {
        this.initailIssueCategory = _.clone(this.issueCategory);
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    editIssueCategory() {
        this.ProjectsService.editIssueCategory(this.issueCategory.id, this.issueCategory)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}