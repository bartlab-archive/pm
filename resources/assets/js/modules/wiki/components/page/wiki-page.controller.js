import ControllerBase from 'base/controller.base';

/*
todo: breadcrumbs for wiki page
 */
export default class WikiPageController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'wikisService', '$stateParams', '$mdToast', 'projectsService'];
    }

    $onInit() {
        // this.errors = {};
        // this.isStart = !this.$stateParams.name;

        this.wikisService
            .one(this.projectsService.getCurrentId(), this.$stateParams.name)
            .then((response) => {
                if (response.status === 204) {
                    this.$state.go('wiki.page.edit', {name: this.$stateParams.name});
                } else {
                    this.page = response.data.data;
                }
            });

        // if (this.$stateParams.name) {
        //     this.wikiService.getPageWiki(this.projectsService.getCurrentId(), this.$stateParams.name).then((response) => {
        //         if (!_.isEmpty(response.data)) {
        //             this.data = response.data;
        //         }
        //     });
        // } else {
        //     this.isStart = true;
        //
        //     this.wikiService.getStartPageWiki(this.projectsService.getCurrentId()).then((response) => {
        //         if (!_.isEmpty(response.data)) {
        //             this.data = response.data;
        //         }
        //     });
        // }
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