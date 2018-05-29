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
        if(this.issueCategory) {
          this.issueCategory.assigned_to_id = this.issueCategory.assigned.id
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
        if (!this.issueCategory.id) {
            this.issuesCategoriesService
                .create(this.project.identifier, this.issueCategory)
                .then(() => this.cancel(true))
                .catch((response) => {
                    this.errors = _.get(response, 'data.errors', {});
                  });
        } else {
            this.issuesCategoriesService
              .update(this.issueCategory.id, this.issueCategory)
              .then((response) => {
                this.cancel(true)
              })
              .catch((response) => {
                this.errors = _.get(response, 'data.errors', {});
              });
        }
    }

}
