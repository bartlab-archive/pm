import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} projectsService
 * @property {$rootScope} $rootScope
 * @property {IssuesService} issuesService
 */
export default class IssuesCategoryController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', '$rootScope', 'issuesService', 'projectsService'];
    }

    $onInit() {
        this.errors = {};
        this.form = null;
        this.title = this.category ? this.category.name : 'New issue category';
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
        let model = {
            assigned_to_id: this.category.assigned ? this.category.assigned.id : null,
            name: this.category.name
        };

        (this.category.id ?
            this.issuesService.updateCategory(this.category.id, model) :
            this.issuesService.createCategory(this.project.identifier, model))
            .then(() => this.cancel(true))
            .catch((response) => {
                this.errors = _.get(response, 'data.errors', {});
            });
    }

}
