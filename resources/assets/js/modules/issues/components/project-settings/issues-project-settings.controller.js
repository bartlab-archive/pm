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
        this.categories = [];
        this.load();
        this.updateIssuesCategories = this.$rootScope.$on('updateIssuesCategories', () => this.load());
    }

    $onDestroy() {
        this.updateIssuesCategories();
    }

    load() {
        this.issuesCategoriesService.list(this.params.identifier).then((response) => {
            this.categories = response.data.data;
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

    create($event) {
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

    edit($event, item) {
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                project: this.params,
                issueCategory: item
            })
        );
    }

    remove(item) {
        let confirm = this.$mdDialog.confirm()
            .title('Do you want to delete "' + item.name + '" issue category?')
            .ok('Delete')
            .cancel('Cancel');

        this.$mdDialog
            .show(confirm)
            .then(() => this.issuesCategoriesService.remove(item.id))
            .then(() => {
                this.$rootScope.$emit('updateIssuesCategories');
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success delete!').position('bottom left')
                );
            });
    }

}