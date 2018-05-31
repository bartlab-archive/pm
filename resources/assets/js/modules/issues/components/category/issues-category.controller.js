import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class IssuesCategoryController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', '$rootScope', 'issuesCategoriesService'];
    }

    $onInit() {
        this.errors = {};
        this.form = null;
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
            this.$rootScope.$emit('updateIssuesCategories');
        }
    }

    submit() {
        let requestObject = {
            id: this.issueCategory.id,
            assigned_to_id: this.issueCategory.assigned ? this.issueCategory.assigned.id : null,
            name: this.issueCategory.name
        };

        (this.issueCategory.id ?
            this.issuesCategoriesService.update(requestObject.id, requestObject) :
            this.issuesCategoriesService.create(this.project.identifier, requestObject))
            .then(() => this.cancel(true))
            .catch((response) => {
              this.errors = _.get(response, 'data.errors', {});
            });
    }

}
