import ControllerBase from 'base/controller.base';
import IssuesCategoryController from "../category/issues-category.controller";
import issuesCategoryTemplate from "../category/issues-category.html";

/**
 */
export default class IssuesProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog'];
    }

    $onInit() {
        // todo: remove temp variable
        this.project = this.params;
        // this.issuesCategories = this.project.
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
                project: this.project
            })
        );
    }
}