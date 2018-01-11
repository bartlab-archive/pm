import ControllerBase from 'base/controller.base';
import _ from 'lodash';

export default class WikiPageController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile', '$filter'];
    }

    $onInit() {
        this.errors = {};
        this.isStart = false;

        if (this.$stateParams.name) {
            this.WikiService.getPageWiki(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                }
            });
        } else {
            this.isStart = true;

            this.WikiService.getStartPageWiki(this.$stateParams.project_id).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                }
            });
        }
    }

    indexBy(order) {
        this.$state.go('wiki.index-by-' + order);
    }

    startPage() {
        this.$state.go('wiki.index');
    }

    delete($event) {
        let confirm = this.$mdDialog.confirm()
            .title('Would you like to delete this page?')
            .targetEvent($event)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.WikiService.deleteWikiPage(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                // console.log(response.data);
                this.deleteResult = response.data;
                if (this.deleteResult.success) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent('Success deleted!')
                    );
                    this.$state.go('wiki.index', {project_id: this.$stateParams.project_id})
                }
            });
        });
    }

    goToEdit(name) {
        this.$state.go('wiki.page.edit', {name: name});
    }

    openActionMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    submit() {
        this.data.save().then((response) => {
            if (response && response.status === 200) {
                this.mdToast.success();
            }
        });
    }

}