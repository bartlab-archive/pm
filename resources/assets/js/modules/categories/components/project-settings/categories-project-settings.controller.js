import ControllerBase from 'base/controller.base';

export default class CategoriesProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$rootScope', '$mdDialog', 'categoriesService', 'projectsService'];
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
        this.categoriesService
            .all(this.projectsService.getCurrentId())
            .then((response) => {
                this.categories = response.data.data;
            });
    }

    remove(item) {
        let confirm = this.$mdDialog.confirm()
            .title('Do you want to delete "' + item.name + '" issue category?')
            .ok('Delete')
            .cancel('Cancel');

        this.$mdDialog
            .show(confirm)
            .then(() => this.categoriesService.remove(item.id))
            .then(() => {
                this.$rootScope.$emit('updateIssuesCategories');
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success delete!')//.position('bottom left')
                );
            });
    }

}