import ControllerBase from 'base/controller.base';
import IssueCategoriesService from "../../services/issue-categories.service";

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class IssuesCategoryController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', '$rootScope', 'issueCategoriesService'];
    }

    $onInit() {
        // if project identifier not set - close dialog
        if (!this.project.identifier) {
            this.cancel();
        }
    }

    cancel(update) {
        this.$mdDialog.cancel();

        if (update) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Success saved!').position('bottom left')
            );
            this.$rootScope.$emit('updateProjectInfo');
        }
    }

    submit() {
        if (! this.issueCategory.id) {
            this.issueCategoriesService.create(this.project.identifier, this.issueCategory)
              .then(() => this.cancel(true));
        } else {
            // this.projectsService.editIssueCategory(this.issueCategory.id, this.issueCategory)
            //     .then(() => this.cancel(true));
        }
    }

}
