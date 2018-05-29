import ControllerBase from 'base/controller.base';
import IssuesCategoryController from "../category/issues-category.controller";
import issuesCategoryTemplate from "../category/issues-category.html";

/**
 */
export default class IssuesProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$rootScope', '$mdDialog', 'issuesCategoriesService'];
    }

    $onInit() {
      this.loadIssueCategories();
      this.updateIssuesCategories = this.$rootScope.$on('updateIssuesCategories', () => this.loadIssueCategories());
    }

    loadIssueCategories() {
      console.log('loadIssueCategories...');
      this.issuesCategoriesService.listByProject(this.params.identifier).then((response) => {
        this.issuesCategories = response.data.data;
      });
    }

    static setMdDialogConfig(target, data = {}) {
        return {
            controller: IssuesCategoryController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: issuesCategoryTemplate,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
    }

    createIssuesCategory($event) {
        // if ($event.ctrlKey || $event.metaKey) {
        //   return;
        // }
        //
        // $event.preventDefault();

        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                project: this.params
            })
        );
    }

    editIssuesCategory($event, item) {
      this.$mdDialog.show(
        this.constructor.setMdDialogConfig($event.target, {
          project: this.params,
          issueCategory: item
        })
      );
    }

    deleteIssuesCategory(item) {
      let confirm = this.$mdDialog.confirm()
        .title('Do you want to delete "' + item.name + '" issue category?')
        .ok('Delete')
        .cancel('Cancel');

      this.$mdDialog.show(confirm)
        .then(() => this.issuesCategoriesService.delete(item.id))
        .then(() => {
          this.loadIssueCategories();
          this.$mdToast.show(
            this.$mdToast.simple().textContent('Success delete!').position('bottom left')
          );
        });
    }

}