import ControllerBase from 'base/controller.base';

/**
 * @property {StatusesService} statusesService
 */
export default class StatusesListController extends ControllerBase {

    static get $inject() {
        return ['statusesService', '$mdDialog', '$mdToast'];
    }

    $onInit() {
        this.loadProccess = false;
        this.load();
    }

    load() {
        this.loadProccess = true;

        return this.statusesService
            .all()
            .then((response) => {
                this.statuses = response.data.data;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

    remove(status) {
        let confirm = this.$mdDialog.confirm()
            .title('Do you want to delete "' + status.name + '" issue status?')
            .ok('Delete')
            .cancel('Cancel');

        this.$mdDialog.show(confirm)
            .then(() => this.statusesService.remove(status.id))
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success delete!')
                );

                this.load();
            });
    }
}