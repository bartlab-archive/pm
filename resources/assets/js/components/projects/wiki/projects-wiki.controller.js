import angular from 'angular';
import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';

export default class ProjectsWikiController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile', '$filter'];
    }

    $onInit() {
        this.errors = {};
        if (this.$stateParams.name) {

            this.WikiService.getPageWiki(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                }
            });

        } else {
            this.WikiService.getStartPageWiki(this.$stateParams.project_id).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                }
            });
        }

        this.WikiService.getAllWikiPage(this.$stateParams.project_id).then((response) => {
            if (!_.isEmpty(response.data)) {
                this.pageList = response.data;
            }
        });
    }

    indexBy(order) {
        this.$state.go('projects.inner.wiki.index-by-' + order);
    }

    startPage() {
        this.$state.go('projects.inner.wiki.index');
    }

    setMdDialogConfig(component, target) {
        let ctrlConfig = [].concat(
            component.controller.$inject || [],
            [(...args) => {
                let ctrl = new component.controller(...args);
                ctrl.$onInit && ctrl.$onInit();
                return ctrl;
            }]
        );

        return {
            controller: ctrlConfig,
            controllerAs: '$ctrl',
            template: component.template,
            panelClass: 'modal-custom-dialog',
            parent: angular.element(document.body),
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            disableParentScroll: true,
            openFrom: target,
            closeTo: target
        }
    }

    newPage() {
        this.$state.go('projects.inner.wiki.new');
    }

    delete($event) {
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete this page?')
            .targetEvent($event)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.WikiService.deleteWikiPage(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                console.log(response.data);
                this.deleteResult = response.data;
                if (this.deleteResult.success) {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Success deleted!')
                    );
                    this.$state.go('projects.inner.wiki.index', {project_id: this.$stateParams.project_id})
                }
            });
        });
    }

    showConfirm($event) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent($event)
            .ok('Please do it!')
            .cancel('Sounds like a scam');

        this.$mdDialog.show(confirm).then(function () {
            // $scope.status = 'You decided to get rid of your debt.';
        }, function () {
            // $scope.status = 'You decided to keep your debt.';
        });
    };

    goToEdit(name) {
        this.$state.go('projects.inner.wiki.page.edit', {name: name});
    }

    openActionMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    submit() {
        this.data.save().then((response) => {
            if (response && response.status === 200) {
                this.mdToast.success();
            }
        });
    }

    goto(name) {
        this.$state.go('projects.inner.wiki.page', {name: name});
    }

}