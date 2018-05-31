import ControllerBase from 'base/controller.base';

/*
todo: breadcrumbs for wiki page
todo: chanhe icon for lock button
todo: chanhe icon for watch button
 */

/**
 * WikiPageController
 *
 * @property {$state} $state
 * @property {$mdDialog} $mdDialog
 * @property {$stateParams} $stateParams
 * @property {$mdToast} $mdToast
 * @property {projectsService} projectsService
 * @property {wikisService} wikisService
 */
export default class WikisPageController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'wikisService', '$stateParams', '$mdToast', 'projectsService'];
    }

    $onInit() {
        this.load();
        // this.defaultPageTitle = 'Wiki';
    }

    load() {
        this.loadProccess = true;
        return this.wikisService
            .one(this.projectsService.getCurrentId(), this.$stateParams.name)
            .then((response) => {
                this.loadProccess = false;

                if (response.status === 204) {
                    this.$state.go('wiki.page.edit', {name: this.$stateParams.name});
                } else {
                    this.page = response.data.data;
                }
            });
    }

    // indexBy(order) {
    //     this.$state.go('wiki.index-by-' + order);
    // }
    //
    // startPage() {
    //     this.$state.go('wiki.index');
    // }
    //
    // delete($event) {
    //     let confirm = this.$mdDialog.confirm()
    //         .title('Would you like to delete this page?')
    //         .targetEvent($event)
    //         .ok('Delete!')
    //         .cancel('Cancel');
    //
    //     this.$mdDialog.show(confirm).then(() => {
    //         this.wikiService.deleteWikiPage(this.projectsService.getCurrentId(), this.$stateParams.name).then((response) => {
    //             // console.log(response.data);
    //             this.deleteResult = response.data;
    //             if (this.deleteResult.success) {
    //                 this.$mdToast.show(
    //                     this.$mdToast.simple().textContent('Success deleted!')
    //                 );
    //                 this.$state.go('wiki.index', {project_id: this.projectsService.getCurrentId()})
    //             }
    //         });
    //     });
    // }
    //
    // goToEdit(name) {
    //     this.$state.go('wiki.page.edit', {name: name});
    // }
    //
    // openActionMenu($mdMenu, ev) {
    //     $mdMenu.open(ev);
    // }
    //
    // submit() {
    //     this.data.save().then((response) => {
    //         if (response && response.status === 200) {
    //             this.mdToast.success();
    //         }
    //     });
    // }

}